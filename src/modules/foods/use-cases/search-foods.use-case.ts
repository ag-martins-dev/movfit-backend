import { Injectable } from '@nestjs/common'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { SearchFoodsInput, SearchFoodsOutput } from 'src/modules/foods/types'

@Injectable()
export class SearchFoodsUseCase {
  constructor(private readonly foodsRepository: FoodsRepository) {}

  async execute(input: SearchFoodsInput): Promise<SearchFoodsOutput> {
    if (input.category) {
      const foods = await this.foodsRepository.findManyByCategory({
        userId: input.userId,
        limit: input.limit,
        offset: input.offset,
        category: input.category,
        isRecipe: input.isRecipe,
      })

      return {
        foundedFoods: foods.length,
        foods: foods.map((food) => ({
          id: food.id,
          name: food.name,
          category: food.category,
          normalizedNutritionalInfos: {
            caloriesInKcal: food.normalizedCaloriesInKcal,
            proteinsInGrams: food.normalizedProteinsInGrams,
            carbsInGrams: food.normalizedCarbsInGrams,
            fatsInGrams: food.normalizedFatsInGrams,
          },
        })),
      }
    }

    const foods = await this.foodsRepository.findAll({
      userId: input.userId,
      limit: input.limit,
      offset: input.offset,
      isRecipe: input.isRecipe,
    })

    return {
      foundedFoods: foods.length,
      foods: foods.map((food) => ({
        id: food.id,
        name: food.name,
        category: food.category,
        normalizedNutritionalInfos: {
          caloriesInKcal: food.normalizedCaloriesInKcal,
          proteinsInGrams: food.normalizedProteinsInGrams,
          carbsInGrams: food.normalizedCarbsInGrams,
          fatsInGrams: food.normalizedFatsInGrams,
        },
      })),
    }
  }
}
