import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { PortionUnit } from 'generated/prisma/enums'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { CreateDietInput, CreateDietOutput } from 'src/modules/diets/types'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { MealsRepository } from 'src/modules/meals/repositories/meals.repository'

@Injectable()
export class CreateDietUseCase {
  constructor(
    private readonly dietsRepository: DietsRepository,
    private readonly mealsRepository: MealsRepository,
    private readonly foodsRepository: FoodsRepository,
    private readonly requestContext: RequestContextService,
    private readonly transaction: TransactionService,
  ) {}

  async execute(input: CreateDietInput): Promise<CreateDietOutput> {
    const { name: dietName, goal: dietGoal, meals: dietMeals } = input

    const userId = this.requestContext.getUserId

    const mealsTimes = dietMeals.map((dietMeal) => dietMeal.timeInMinutes)

    if (new Set(mealsTimes).size !== mealsTimes.length) {
      throw new BadRequestException('Duplicate meal time')
    }

    const sortedMeals = dietMeals.sort((a, b) => a.timeInMinutes - b.timeInMinutes)

    const foodsIds = new Set(sortedMeals.flatMap((meal) => meal.foods.map((food) => food.foodId)))
    const foods = await this.foodsRepository.findManyByIds([...foodsIds.keys()])
    const foodsMap = new Map(foods.map((food) => [food.id, food]))

    const computedMeals = sortedMeals.map((dietMeal) => {
      const mealFoods = dietMeal.foods.map((dietMealFood) => {
        const food = foodsMap.get(dietMealFood.foodId)

        if (!food) throw new NotFoundException(`Food with ID: ${dietMealFood.foodId} not found`)

        const foodMacros = this.calculateMealMacros(food, dietMealFood.amount, dietMealFood.unit)

        return {
          foodId: food.id,
          name: food.name,
          isCustom: food.isCustom,
          caloriesInKcal: foodMacros.caloriesInKcal,
          proteinsInGrams: foodMacros.proteinsInGrams,
          carbsInGrams: foodMacros.carbsInGrams,
          fatsInGrams: foodMacros.fatsInGrams,
          amount: dietMealFood.amount,
          unit: dietMealFood.unit,
        }
      })

      const mealTotalMacros = mealFoods.reduce(
        (total, food) => ({
          caloriesInKcal: total.caloriesInKcal + food.caloriesInKcal,
          proteinsInGrams: total.proteinsInGrams + food.proteinsInGrams,
          carbsInGrams: total.carbsInGrams + food.carbsInGrams,
          fatsInGrams: total.fatsInGrams + food.fatsInGrams,
        }),
        { caloriesInKcal: 0, proteinsInGrams: 0, carbsInGrams: 0, fatsInGrams: 0 },
      )

      return {
        name: dietMeal.name,
        timeInMinutes: dietMeal.timeInMinutes,
        foods: mealFoods,
        mealTotalMacros,
      }
    })

    const dietTotalMacros = computedMeals.reduce(
      (total, meal) => ({
        caloriesInKcal: total.caloriesInKcal + meal.mealTotalMacros.caloriesInKcal,
        carbsInGrams: total.carbsInGrams + meal.mealTotalMacros.carbsInGrams,
        fatsInGrams: total.fatsInGrams + meal.mealTotalMacros.fatsInGrams,
        proteinsInGrams: total.proteinsInGrams + meal.mealTotalMacros.proteinsInGrams,
      }),
      { caloriesInKcal: 0, carbsInGrams: 0, fatsInGrams: 0, proteinsInGrams: 0 },
    )

    return await this.transaction.run(async () => {
      const activeDiet = await this.dietsRepository.findActive(userId)

      if (activeDiet) await this.dietsRepository.deactivate(activeDiet.id, userId)

      const createdDiet = await this.dietsRepository.create({
        userId,
        goal: dietGoal,
        name: dietName,
        totalCaloriesInKcal: dietTotalMacros.caloriesInKcal,
        totalCarbsInGrams: dietTotalMacros.carbsInGrams,
        totalFatsInGrams: dietTotalMacros.fatsInGrams,
        totalProteinsInGrams: dietTotalMacros.proteinsInGrams,
      })

      // TODO: Swith to "mealsRepo.createMany" method.
      for (const meal of computedMeals) {
        await this.mealsRepository.create({
          dietId: createdDiet.id,
          name: meal.name,
          foods: meal.foods,
          timeInMinutes: meal.timeInMinutes,
          totalCaloriesInKcal: meal.mealTotalMacros.caloriesInKcal,
          totalProteinsInGrams: meal.mealTotalMacros.proteinsInGrams,
          totalCarbsInGrams: meal.mealTotalMacros.carbsInGrams,
          totalFatsInGrams: meal.mealTotalMacros.fatsInGrams,
        })
      }

      return {
        id: createdDiet.id,
        goal: createdDiet.goal,
        macros: {
          caloriesInKcal: createdDiet.totalCaloriesInKcal,
          proteinsInGrams: createdDiet.totalProteinsInGrams,
          carbsInGrams: createdDiet.totalCarbsInGrams,
          fatsInGrams: createdDiet.totalFatsInGrams,
        },
      }
    })
  }

  private convertToGrams(amount: number, unit: PortionUnit) {
    if (unit === 'G') {
      return amount
    }
    if (unit === 'KG') {
      return amount * 1_000
    }
    throw new BadRequestException('Invalid unit for solid food.')
  }

  private calculateMealMacros(food: Food, amount: number, unit: PortionUnit) {
    const { normalizedBase } = food

    if (normalizedBase === 'PER_100G') {
      const amountInGrams = this.convertToGrams(amount, unit)
      const factor = amountInGrams / 100

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * factor,
        proteinsInGrams: food.normalizedProteinsInGrams * factor,
        carbsInGrams: food.normalizedCarbsInGrams * factor,
        fatsInGrams: food.normalizedFatsInGrams * factor,
      }
    }

    if (normalizedBase === 'PER_100ML') {
      if (unit !== 'ML' && unit !== 'L') {
        throw new BadRequestException(`Invalid unit (${unit}) for liquid food`)
      }

      const amountInMl = unit === 'L' ? amount * 1_000 : amount
      const factor = amountInMl / 100

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * factor,
        proteinsInGrams: food.normalizedProteinsInGrams * factor,
        carbsInGrams: food.normalizedCarbsInGrams * factor,
        fatsInGrams: food.normalizedFatsInGrams * factor,
      }
    }

    if (normalizedBase === 'PER_UNIT') {
      if (unit !== 'UNIT') {
        throw new BadRequestException(`Invalid unit (${unit}) for unit-based food`)
      }

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * amount,
        proteinsInGrams: food.normalizedProteinsInGrams * amount,
        carbsInGrams: food.normalizedCarbsInGrams * amount,
        fatsInGrams: food.normalizedFatsInGrams * amount,
      }
    }

    throw new Error('Invalid normalized base')
  }
}
