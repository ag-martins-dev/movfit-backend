import { Injectable } from '@nestjs/common'
import { NormalizedBase, PortionUnit } from 'generated/prisma/enums'
import { FoodsRepository } from '../repositories/foods.repository'
import { FoodNutritionalInfos } from '../types/food-nutritional-infos.type'
import { SaveFoodRequest } from '../types/save-food.types'

@Injectable()
export class SaveFoodUseCase {
  constructor(private readonly foodsRepo: FoodsRepository) {}

  async execute(request: SaveFoodRequest) {
    const nutritionalInfos = {
      caloriesInKcal: request.caloriesInKcal,
      proteinsInGrams: request.proteinsInGrams,
      carbsInGrams: request.carbsInGrams,
      fatsInGrams: request.fatsInGrams,
    }

    const { normalizedBase, ...normalizedValues } = this.getNormalizedNutritionalInfos(
      nutritionalInfos,
      request.portion.amount,
      request.portion.unit,
    )

    const savedFood = await this.foodsRepo.save(request.userId, {
      name: request.name,
      category: request.category,
      normalizedBase,
      ...nutritionalInfos,
      ...normalizedValues,
    })

    return {
      id: savedFood.id,
      name: savedFood.name,
      category: savedFood.category,
      description: savedFood.description,
      amount: request.portion.amount,
      unit: request.portion.unit,
      nutritionalInfos,
      normalizedNutritionalInfos: {
        caloriesInKcal: savedFood.normalizedCaloriesInKcal,
        proteinsInGrams: savedFood.normalizedProteinsInGrams,
        carbsInGrams: savedFood.normalizedCarbsInGrams,
        fatsInGrams: savedFood.normalizedFatsInGrams,
      },
    }
  }

  private getNormalizedBase(unit: PortionUnit): NormalizedBase {
    switch (unit) {
      case 'G':
      case 'KG':
        return 'PER_100G'

      case 'ML':
      case 'L':
        return 'PER_100ML'

      case 'UNIT':
        return 'PER_UNIT'

      default:
        throw new Error('Invalid unit')
    }
  }

  private convertToBase(amount: number, unit: PortionUnit) {
    switch (unit) {
      case 'KG':
        return amount * 1000
      case 'L':
        return amount * 1000
      default:
        return amount
    }
  }

  private getNormalizedNutritionalInfos(original: FoodNutritionalInfos, amount: number, unit: PortionUnit) {
    const base = this.getNormalizedBase(unit)

    if (base === 'PER_100G' || base === 'PER_100ML') {
      const baseAmount = this.convertToBase(amount, unit)

      const factor = 100 / baseAmount

      return {
        normalizedBase: base,
        normalizedCaloriesInKcal: Math.round(original.caloriesInKcal * factor),
        normalizedProteinsInGrams: Math.round(original.proteinsInGrams * factor),
        normalizedCarbsInGrams: Math.round(original.carbsInGrams * factor),
        normalizedFatsInGrams: Math.round(original.fatsInGrams * factor),
      }
    }

    return {
      normalizedBase: base,
      normalizedCaloriesInKcal: original.caloriesInKcal,
      normalizedProteinsInGrams: original.proteinsInGrams,
      normalizedCarbsInGrams: original.carbsInGrams,
      normalizedFatsInGrams: original.fatsInGrams,
    }
  }
}
