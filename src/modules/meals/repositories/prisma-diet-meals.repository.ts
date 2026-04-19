import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CreateMealInput } from '../types/create-meal.type'
import { MealsRepository } from './meals.repository'

@Injectable()
export class PrismaMealsRepository implements MealsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateMealInput): Promise<Meal> {
    const meal = await this.prisma.meal.create({
      data: {
        dietId: input.dietId,
        name: input.name,
        timeInMinutes: input.timeInMinutes,
        totalCaloriesInKcal: input.totalCaloriesInKcal,
        totalCarbsInGrams: input.totalCarbsInGrams,
        totalProteinsInGrams: input.totalProteinsInGrams,
        totalFatsInGrams: input.totalFatsInGrams,
        foods: {
          createMany: {
            data: input.foods.map((mealFood) => ({
              foodId: mealFood.foodId,
              amount: mealFood.amount,
              unit: mealFood.unit,
              caloriesInKcal: mealFood.caloriesInKcal,
              carbsInGrams: mealFood.carbsInGrams,
              fatsInGrams: mealFood.fatsInGrams,
              proteinsInGrams: mealFood.proteinsInGrams,
            })),
          },
        },
      },
    })
    return meal
  }
}
