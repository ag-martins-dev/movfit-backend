import { Injectable } from '@nestjs/common'
import { DietsRepository } from '../repositories/diets.repository'

@Injectable()
export class GetDietsUseCase {
  constructor(private readonly dietsRepo: DietsRepository) {}

  async execute(userId: string) {
    const diets = await this.dietsRepo.getAll(userId)

    if (diets.length === 0) return []

    return diets.map((diet) => ({
      id: diet.id,
      isActive: diet.isActive,
      goal: diet.goal,
      createdAt: diet.createdAt,
      macros: {
        caloriesInKcal: diet.totalCaloriesInKcal,
        proteinsInGrams: diet.totalProteinsInGrams,
        carbsInGrams: diet.totalCarbsInGrams,
        fats: diet.totalFatsInGrams,
      },
    }))
  }
}
