import { Food } from 'generated/prisma/client'
import {
  FindAllFoodsRepositoryInput,
  FindManyFoodsByCategoryInput,
  SaveFoodRepositoryInput,
} from 'src/modules/foods/types'

export abstract class FoodsRepository {
  abstract findManyByCategory(input: FindManyFoodsByCategoryInput): Promise<Food[]>
  abstract findManyByIds(foodsIds: string[]): Promise<Food[]>
  abstract findOne(foodId: string): Promise<Food | null>
  abstract findAll(input: FindAllFoodsRepositoryInput): Promise<Food[]>
  abstract save(input: SaveFoodRepositoryInput): Promise<Food>
}
