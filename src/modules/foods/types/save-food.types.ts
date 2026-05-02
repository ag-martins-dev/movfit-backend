import { NormalizedBase, PortionUnit } from 'generated/prisma/enums'
import { FoodNutritionalInfos } from 'src/modules/foods/types/food-nutritional-infos.types'

export type SaveFoodInput = {
  userId: string
  name: string
  category: string
  portion: {
    amount: number
    unit: PortionUnit
  }
  caloriesInKcal: number
  proteinsInGrams: number
  carbsInGrams: number
  fatsInGrams: number
}

export type SaveFoodOutput = {
  id: string
  name: string
  category: string
  description: string | null
  amount: number
  unit: PortionUnit
  nutritionalInfos: FoodNutritionalInfos
  normalizedNutritionalInfos: FoodNutritionalInfos
}

export type SaveFoodRepositoryInput = {
  userId: string
  name: string
  category: string
  normalizedBase: NormalizedBase
  normalizedCaloriesInKcal: number
  normalizedProteinsInGrams: number
  normalizedCarbsInGrams: number
  normalizedFatsInGrams: number
}
