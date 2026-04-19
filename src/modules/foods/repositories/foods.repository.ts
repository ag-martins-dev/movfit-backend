import { Food } from 'generated/prisma/client'
import { GetAllFoodsByCategoryInput, GetAllFoodsInput } from '../types/get-all-foods.types'
import { SaveFoodInput } from '../types/save-food.types'

export abstract class FoodsRepository {
  abstract getManyByIds(foodIds: string[]): Promise<Food[]>
  abstract getOne(foodId: string): Promise<Food | null>
  abstract getAll(userId: string, input: GetAllFoodsInput): Promise<Food[]>
  abstract getAllByCategory(userId: string, input: GetAllFoodsByCategoryInput): Promise<Food[]>
  abstract save(userId: string, input: SaveFoodInput): Promise<Food>
}
