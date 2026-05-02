export type SearchFoodsInput = {
  userId: string
  category?: string
  isRecipe?: boolean
  limit: number
  offset: number
}

export type SearchFoodsOutput = {
  foundedFoods: number
  foods: {
    id: string
    name: string
    category: string
    normalizedNutritionalInfos: {
      caloriesInKcal: number
      proteinsInGrams: number
      carbsInGrams: number
      fatsInGrams: number
    }
  }[]
}
