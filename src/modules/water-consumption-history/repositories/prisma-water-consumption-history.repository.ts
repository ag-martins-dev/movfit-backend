import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistory } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'
import { WaterConsumptionHistoryRepository } from './water-consumption-history.repository'

@Injectable()
export class PrismaWaterConsumptionHistoryRepository implements WaterConsumptionHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    userId: string,
    input: GetWaterConsumptionHistoryRequest,
  ): Promise<WaterConsumptionHistory[]> {
    const waterConsumptionHistory = await this.prisma.waterConsumptionHistory.findMany({
      where: {
        userId,
        date: { gte: input.fromDate, lte: input.toDate },
      },
    })
    return waterConsumptionHistory
  }
}
