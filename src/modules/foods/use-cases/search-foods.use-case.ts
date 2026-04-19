import { Injectable } from '@nestjs/common'
import { FoodsRepository } from '../repositories/foods.repository'
import { SearchFoodsRequest } from '../types/search-foods.types'

@Injectable()
export class SearchFoodsUseCase {
  constructor(private readonly foodsRepo: FoodsRepository) {}

  async execute(request: SearchFoodsRequest) {
    if (request.category) {
      const foods = await this.foodsRepo.getAllByCategory(request.userId, {
        limit: request.limit,
        offset: request.offset,
        category: request.category,
        isRecipe: request.isRecipe,
      })
      return {
        quantity: foods.length,
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
    const foods = await this.foodsRepo.getAll(request.userId, {
      limit: request.limit,
      offset: request.offset,
      isRecipe: request.isRecipe,
    })
    return {
      quantity: foods.length,
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
