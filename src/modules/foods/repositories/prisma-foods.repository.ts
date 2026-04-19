import { Injectable } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetAllFoodsByCategoryInput, GetAllFoodsInput } from '../types/get-all-foods.types'
import { SaveFoodInput } from '../types/save-food.types'
import { FoodsRepository } from './foods.repository'

@Injectable()
export class PrismaFoodsRepository implements FoodsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(foodId: string): Promise<Food | null> {
    const food = await this.prisma.food.findFirst({
      where: { id: foodId },
    })
    if (!food) return null
    return food
  }

  async getManyByIds(foodIds: string[]): Promise<Food[]> {
    if (!foodIds.length) return []

    const uniqueIds = [...new Set(foodIds)]

    const foods = await this.prisma.food.findMany({
      where: { id: { in: uniqueIds } },
    })

    return foods
  }

  async save(userId: string, input: SaveFoodInput): Promise<Food> {
    const savedFood = await this.prisma.food.create({
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
    return savedFood
  }

  async getAll(userId: string, input: GetAllFoodsInput): Promise<Food[]> {
    const where = input.isRecipe === undefined ? { userId } : { userId, isRecipe: input.isRecipe }
    const foods = await this.prisma.food.findMany({
      where,
      orderBy: { name: 'asc' },
      take: input.limit,
      skip: input.offset,
    })
    return foods
  }

  async getAllByCategory(userId: string, input: GetAllFoodsByCategoryInput): Promise<Food[]> {
    const where =
      input.isRecipe === undefined
        ? { userId, category: input.category }
        : { userId, isRecipe: input.isRecipe, category: input.category }
    const foods = await this.prisma.food.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
      take: input.limit,
      skip: input.offset,
    })
    return foods
  }
}
