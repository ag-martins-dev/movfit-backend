import { DietGoal } from 'generated/prisma/enums'

export type GetDietsOutput = {
  id: string
  isActive: boolean
  goal: DietGoal
  createdAt: Date
  macros: {
    caloriesInKcal: number
    proteinsInGrams: number
    carbsInGrams: number
    fatsInGrams: number
  }
}
