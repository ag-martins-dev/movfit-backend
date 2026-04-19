export type GetAllFoodsInput = {
  limit: number
  offset: number
  isRecipe?: boolean
}

export type GetAllFoodsByCategoryInput = GetAllFoodsInput & {
  category: string
}
