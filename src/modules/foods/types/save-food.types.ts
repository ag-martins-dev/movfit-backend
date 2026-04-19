import { NormalizedBase, PortionUnit } from 'generated/prisma/enums'

export type SaveFoodRequest = {
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

export type SaveFoodInput = {
  name: string
  category: string
  normalizedBase: NormalizedBase
  normalizedCaloriesInKcal: number
  normalizedProteinsInGrams: number
  normalizedCarbsInGrams: number
  normalizedFatsInGrams: number
}
