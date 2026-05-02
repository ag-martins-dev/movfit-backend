import { Injectable } from '@nestjs/common'
import { formatDateToBrFormat } from 'src/common/helpers/format-date-to-br-format.helper'
import { parseDateToTime } from 'src/common/helpers/parse-date-to-time.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import {
  GetWaterConsumptionHistoryInput,
  GetWaterConsumptionHistoryOutput,
} from '../types/get-water-consumption-history.type'

@Injectable()
export class GetWaterConsumptionHistoryUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: GetWaterConsumptionHistoryInput): Promise<GetWaterConsumptionHistoryOutput | null> {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile

    input.toDate.setUTCHours(23, 59, 59, 999) // Set UTC Hours to more later hour as possible

    const consumptionHistory = await this.waterConsumptionRepository.findHistory({
      userId,
      fromDate: input.fromDate,
      toDate: input.toDate,
    })

    const totalConsumedInMl = consumptionHistory.reduce((acc, current) => {
      return acc + current.amountConsumedInMl
    }, 0)

    return {
      range: {
        fromDate: formatDateToBrFormat(input.fromDate, timezone),
        toDate: formatDateToBrFormat(input.toDate, timezone),
      },
      consumptionHistory: consumptionHistory.map((consumption) => {
        return {
          id: consumption.id,
          amountConsumedInMl: consumption.amountConsumedInMl,
          consumptionDate: formatDateToBrFormat(consumption.dateOfConsumption, timezone),
          consumptionTime: parseDateToTime(consumption.dateOfConsumption, timezone),
        }
      }),
      totalConsumedInMl,
    }
  }
}
