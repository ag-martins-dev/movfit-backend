import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyNutritionRepository } from 'src/modules/daily-nutrition/repositories/daily-nutrition.repository'
import { UpdateNutritionProgressInput, UpdateNutritionProgressOutput } from 'src/modules/daily-nutrition/types'

@Injectable()
export class UpdateNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepository: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: UpdateNutritionProgressInput): Promise<UpdateNutritionProgressOutput> {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile

    const updatedTodayDailyNutrition = await this.dailyNutritionRepository.upsert({
      userId,
      timezone,
      carbsInGrams: input.carbsInGrams,
      fatsInGrams: input.fatsInGrams,
      proteinsInGrams: input.proteinsInGrams,
    })

    return {
      id: updatedTodayDailyNutrition.id,
      day: updatedTodayDailyNutrition.day,
      carbsInGrams: updatedTodayDailyNutrition.carbsInGrams,
      fatsInGrams: updatedTodayDailyNutrition.fatsInGrams,
      proteinsInGrams: updatedTodayDailyNutrition.proteinsInGrams,
    }
  }
}
