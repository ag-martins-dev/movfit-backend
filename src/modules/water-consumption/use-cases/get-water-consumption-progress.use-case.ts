import { Injectable } from '@nestjs/common'
import { toPercentage } from 'src/common/helpers'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { parseDateToTime } from 'src/common/helpers/parse-date-to-time.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from 'src/modules/water-consumption/repositories/water-consumption.repository'
import { GetWaterConsumptionProgressOutput } from 'src/modules/water-consumption/types'

@Injectable()
export class GetWaterConsumptionProgressUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<GetWaterConsumptionProgressOutput> {
    const userId = this.requestContext.getUserId

    const { timezone } = this.requestContext.getProfile

    const todayAtMidnight = getTodayInTimezone(timezone)
    const todayAtEndOfDay = new Date(todayAtMidnight)

    todayAtEndOfDay.setUTCHours(23, 59, 59, 999)

    const todayConsumptionsHistory = await this.waterConsumptionRepository.findHistory({
      userId,
      fromDate: todayAtMidnight,
      toDate: todayAtEndOfDay,
    })

    const todayTotalConsumptionInMl = todayConsumptionsHistory.reduce(
      (total, current) => total + current.amountConsumedInMl,
      0,
    )

    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption

    return {
      targetConsumptionInMl: dailyWaterConsumption.targetInMl,
      totalConsumedInMl: todayTotalConsumptionInMl,
      consumptionProgress: toPercentage(dailyWaterConsumption.targetInMl, todayTotalConsumptionInMl),
      consumptionsHistory: todayConsumptionsHistory.map((consumption) => ({
        id: consumption.id,
        amountConsumedInMl: consumption.amountConsumedInMl,
        time: parseDateToTime(consumption.dateOfConsumption, timezone),
      })),
    }
  }
}
