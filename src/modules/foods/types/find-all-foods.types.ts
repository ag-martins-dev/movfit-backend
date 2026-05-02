export type FindAllFoodsInput = {
  limit: number
  offset: number
  isRecipe?: boolean
}

export type FindAllFoodsByCategoryInput = FindAllFoodsInput & {
  category: string
}

export type FindAllFoodsRepositoryInput = FindAllFoodsInput & {
  userId: string
}
