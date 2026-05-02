import { Injectable } from '@nestjs/common'
import { DailyWaterConsumption } from 'generated/prisma/client'
import { UpsertDailyWaterConsumptionInput } from '../types/upsert-daily-water-consumption.types'

@Injectable()
export abstract class DailyWaterConsumptionRepository {
  abstract findOne(userId: string): Promise<DailyWaterConsumption | null>
  abstract upsert(userId: string, input: UpsertDailyWaterConsumptionInput): Promise<DailyWaterConsumption>
}
