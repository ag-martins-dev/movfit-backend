import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistoryRepository } from '../repositories/water-consumption-history.repository'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'

@Injectable()
export class GetWaterConsumptionHistoryUseCase {
  constructor(private readonly waterConsumptionHistoryRepo: WaterConsumptionHistoryRepository) {}

  async execute(userId: string, input: GetWaterConsumptionHistoryRequest) {
    const waterConsumptionHistory = await this.waterConsumptionHistoryRepo.get(userId, input)
    if (waterConsumptionHistory.length === 0) {
      return []
    }
    return waterConsumptionHistory.map((waterConsumption) => ({
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountInMl,
      dateOfConsumption: waterConsumption.date,
    }))
  }
}
