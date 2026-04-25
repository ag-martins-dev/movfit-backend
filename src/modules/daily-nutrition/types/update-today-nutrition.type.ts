export type UpdateTodayNutritionInput = {
  proteinsInGrams?: number
  carbsInGrams?: number
  fatsInGrams?: number
}

export type UpdateTodayNutritionOutput = {
  id: string
  day: Date
  proteinsInGrams: number
  carbsInGrams: number
  fatsInGrams: number
}
