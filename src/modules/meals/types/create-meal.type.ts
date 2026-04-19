import { PortionUnit } from 'generated/prisma/enums'

type MealFoodItem = {
  foodId: string
  amount: number
  unit: PortionUnit
  caloriesInKcal: number
  proteinsInGrams: number
  carbsInGrams: number
  fatsInGrams: number
}

export type CreateMealInput = {
  dietId: string
  timeInMinutes: number
  name: string

  totalCaloriesInKcal: number
  totalCarbsInGrams: number
  totalProteinsInGrams: number
  totalFatsInGrams: number

  foods: MealFoodItem[]
}
