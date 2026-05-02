import { Injectable } from '@nestjs/common'
import { formatDateToBrFormat } from 'src/common/helpers/format-date-to-br-format.helper'
import { parseDateToTime } from 'src/common/helpers/parse-date-to-time.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from 'src/modules/water-consumption/repositories/water-consumption.repository'
import { RegisterWaterConsumptionOutput } from 'src/modules/water-consumption/types'

@Injectable()
export class RegisterWaterConsumptionUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(amountConsumedInMl: number): Promise<RegisterWaterConsumptionOutput> {
    const userId = this.requestContext.getUserId
    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption

    const { timezone } = this.requestContext.getProfile
    const dateOfConsumption = new Date()

    const waterConsumption = await this.waterConsumptionRepository.create({
      dailyWaterConsumptionId: dailyWaterConsumption.id,
      userId,
      dateOfConsumption,
      amountConsumedInMl,
    })

    return {
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountConsumedInMl,
      consumptionDate: formatDateToBrFormat(waterConsumption.dateOfConsumption, timezone),
      consumptionTime: parseDateToTime(waterConsumption.dateOfConsumption, timezone),
    }
  }
}
