export type FindManyFoodsByCategoryInput = {
  userId: string
  limit: number
  offset: number
  category: string
  isRecipe?: boolean
}
