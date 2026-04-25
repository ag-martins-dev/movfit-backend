export class GetTodayNutritionProgressOutput {
  carbs: {
    targetInGrams: number
    totalConsumptionInGrams: number
    progress: number
  }
  proteins: {
    targetInGrams: number
    totalConsumptionInGrams: number
    progress: number
  }
  fats: {
    targetInGrams: number
    totalConsumptionInGrams: number
    progress: number
  }
}
