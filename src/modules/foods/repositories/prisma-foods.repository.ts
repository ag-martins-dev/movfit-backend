import { Injectable } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { FindManyFoodsByCategoryInput } from 'src/modules/foods/types/find-many-foods-by-category.types'
import { FindAllFoodsRepositoryInput } from '../types/find-all-foods.types'
import { SaveFoodRepositoryInput } from '../types/save-food.types'
import { FoodsRepository } from './foods.repository'

@Injectable()
export class PrismaFoodsRepository extends BaseRepository implements FoodsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(foodId: string): Promise<Food | null> {
    return await this.db.food.findFirst({
      where: { id: foodId },
    })
  }

  async findManyByIds(foodsIds: string[]): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { id: { in: foodsIds } },
    })
  }

  async save(input: SaveFoodRepositoryInput): Promise<Food> {
    return await this.db.food.create({
      data: {
        userId: input.userId,
        name: input.name,
        normalizedBase: input.normalizedBase,
        category: input.category,
        normalizedCaloriesInKcal: input.normalizedCaloriesInKcal,
        normalizedCarbsInGrams: input.normalizedCarbsInGrams,
        normalizedProteinsInGrams: input.normalizedProteinsInGrams,
        normalizedFatsInGrams: input.normalizedFatsInGrams,
        isCustom: true,
      },
    })
  }

  async findAll(input: FindAllFoodsRepositoryInput): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { userId: input.userId },
      orderBy: { name: 'asc' },
      take: input.limit,
      skip: input.offset,
    })
  }

  async findManyByCategory(input: FindManyFoodsByCategoryInput): Promise<Food[]> {
    return await this.db.food.findMany({
      where: {
        AND: {
          userId: input.userId,
          category: input.category,
        },
      },
      orderBy: { name: 'asc' },
      take: input.limit,
      skip: input.offset,
    })
  }
}
