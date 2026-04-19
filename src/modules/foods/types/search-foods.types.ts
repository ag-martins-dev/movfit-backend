export type SearchFoodsRequest = {
  userId: string
  category?: string
  isRecipe?: boolean
  limit: number
  offset: number
}
