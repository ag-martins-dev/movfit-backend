import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import {
  GetWaterConsumptionHistoryRepositoryInput,
  RegisterWaterConsumptionRepositoryInput,
} from 'src/modules/water-consumption/types'

@Injectable()
export abstract class WaterConsumptionRepository {
  abstract findHistory(input: GetWaterConsumptionHistoryRepositoryInput): Promise<WaterConsumption[]>
  abstract create(input: RegisterWaterConsumptionRepositoryInput): Promise<WaterConsumption>
}
