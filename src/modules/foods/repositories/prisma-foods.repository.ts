import { Injectable } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetAllFoodsByCategoryInput, GetAllFoodsInput } from '../types/get-all-foods.types'
import { SaveFoodInput } from '../types/save-food.types'
import { FoodsRepository } from './foods.repository'

@Injectable()
export class PrismaFoodsRepository extends BaseRepository implements FoodsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async getOne(foodId: string): Promise<Food | null> {
    return await this.db.food.findFirst({
      where: { id: foodId },
    })
  }

  async getManyByIds(foodIds: string[]): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { id: { in: foodIds } },
    })
  }

  async save(userId: string, input: SaveFoodInput): Promise<Food> {
    return await this.db.food.create({
      data: {
        userId,
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

  async getAll(userId: string, input: GetAllFoodsInput): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
      take: input.limit,
      skip: input.offset,
    })
  }

  async getAllByCategory(userId: string, input: GetAllFoodsByCategoryInput): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { AND: { userId, category: input.category } },
      orderBy: { name: 'asc' },
      take: input.limit,
      skip: input.offset,
    })
  }
}
