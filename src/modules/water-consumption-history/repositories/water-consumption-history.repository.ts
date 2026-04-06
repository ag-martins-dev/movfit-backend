import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistory } from 'generated/prisma/client'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'

@Injectable()
export abstract class WaterConsumptionHistoryRepository {
  abstract get(
    userId: string,
    input: GetWaterConsumptionHistoryRequest,
  ): Promise<WaterConsumptionHistory[]>
}
