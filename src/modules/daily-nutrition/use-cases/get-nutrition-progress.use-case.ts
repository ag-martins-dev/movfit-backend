import { Injectable } from '@nestjs/common'
import { toPercentage } from 'src/common/helpers'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyNutritionRepository } from 'src/modules/daily-nutrition/repositories/daily-nutrition.repository'
import { GetNutritionProgressOutput } from 'src/modules/daily-nutrition/types'

@Injectable()
export class GetNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepository: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<GetNutritionProgressOutput> {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile
    const activeDiet = this.requestContext.getActiveDiet

    const {
      totalCarbsInGrams: targetCarbsInGrams,
      totalProteinsInGrams: targetProteinsInGrams,
      totalFatsInGrams: targetFatsInGrams,
    } = activeDiet

    let todayNutrition = await this.dailyNutritionRepository.findOne({ userId, timezone })

    if (!todayNutrition) {
      todayNutrition = await this.dailyNutritionRepository.upsert({ userId, timezone })
    }

    const {
      carbsInGrams: totalCarbsConsumptionInGrams,
      proteinsInGrams: totalProteinsConsumptionInGrams,
      fatsInGrams: totalFatsConsumptionInGrams,
    } = todayNutrition

    return {
      carbs: {
        targetInGrams: targetCarbsInGrams,
        totalConsumptionInGrams: totalCarbsConsumptionInGrams,
        progress: toPercentage(targetCarbsInGrams, totalCarbsConsumptionInGrams),
      },
      proteins: {
        targetInGrams: targetProteinsInGrams,
        totalConsumptionInGrams: totalProteinsConsumptionInGrams,
        progress: toPercentage(targetProteinsInGrams, totalProteinsConsumptionInGrams),
      },
      fats: {
        targetInGrams: targetFatsInGrams,
        totalConsumptionInGrams: totalFatsConsumptionInGrams,
        progress: toPercentage(targetFatsInGrams, totalFatsConsumptionInGrams),
      },
    }
  }
}
