import { DietGoal, PortionUnit } from 'generated/prisma/enums'

export type CreateDietRepositoryInput = {
  userId: string
  name: string
  goal: DietGoal
  totalCaloriesInKcal: number
  totalProteinsInGrams: number
  totalCarbsInGrams: number
  totalFatsInGrams: number
}

export type CreateDietInput = {
  name: string
  goal: DietGoal
  meals: {
    name: string
    timeInMinutes: number
    foods: {
      foodId: string
      amount: number
      unit: PortionUnit
    }[]
  }[]
}

export type CreateDietOutput = {
  id: string
  goal: DietGoal
  macros: {
    caloriesInKcal: number
    proteinsInGrams: number
    carbsInGrams: number
    fatsInGrams: number
  }
}
