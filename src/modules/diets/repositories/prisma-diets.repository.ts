import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CreateDietRepositoryInput } from '../types/create-diet.types'
import { DietsRepository } from './diets.repository'

@Injectable()
export class PrismaDietsRepository implements DietsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: CreateDietRepositoryInput): Promise<Diet> {
    const diet = await this.prisma.diet.create({
      data: {
        id: input.dietId,
        totalCaloriesInKcal: input.totalCaloriesInKcal,
        totalProteinsInGrams: input.totalProteinsInGrams,
        totalCarbsInGrams: input.totalCarbsInGrams,
        totalFatsInGrams: input.totalFatsInGrams,
        goal: input.goal,
        isActive: true,
        userId,
      },
    })
    return diet
  }

  async getOne(dietId: string, userId: string): Promise<Diet | null> {
    const diet = await this.prisma.diet.findUnique({
      where: { id: dietId, userId },
    })
    if (!diet) return null
    return diet
  }

  async getAll(userId: string): Promise<Diet[]> {
    const diets = await this.prisma.diet.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'desc' }],
    })
    return diets
  }

  async getActive(userId: string): Promise<Diet | null> {
    const activeDiet = await this.prisma.diet.findFirst({
      where: { userId, isActive: { equals: true } },
    })
    if (!activeDiet) {
      return null
    }
    return activeDiet
  }

  async deactive(dietId: string, userId: string): Promise<void> {
    await this.prisma.diet.update({
      where: { id: dietId, userId },
      data: { isActive: false },
    })
  }

  async delete(dietId: string): Promise<void> {
    await this.prisma.diet.delete({
      where: { id: dietId },
    })
  }
}
