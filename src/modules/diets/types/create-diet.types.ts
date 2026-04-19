import { DietGoal, PortionUnit } from 'generated/prisma/enums'

type Food = {
  foodId: string
  amount: number
  unit: PortionUnit
}

type Meal = {
  name: string
  timeInMinutes: number
  foods: Array<Food>
}

export type CreateDietUseCaseInput = {
  name: string
  goal: DietGoal
  meals: Array<Meal>
}

export type CreateDietRepositoryInput = {
  name: string
  goal: DietGoal
  totalCaloriesInKcal: number
  totalProteinsInGrams: number
  totalCarbsInGrams: number
  totalFatsInGrams: number
  dietId: string
}
