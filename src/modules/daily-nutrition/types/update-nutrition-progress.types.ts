export type UpdateNutritionProgressInput = {
  proteinsInGrams?: number
  carbsInGrams?: number
  fatsInGrams?: number
}

export type UpdateNutritionProgressOutput = {
  id: string
  day: Date
  proteinsInGrams: number
  carbsInGrams: number
  fatsInGrams: number
}
