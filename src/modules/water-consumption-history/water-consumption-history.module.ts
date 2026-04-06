import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { WaterConsumptionHistoryController } from './controller/water-consumption-history.controller'
import { PrismaWaterConsumptionHistoryRepository } from './repositories/prisma-water-consumption-history.repository'
import { WaterConsumptionHistoryRepository } from './repositories/water-consumption-history.repository'
import { GetWaterConsumptionHistoryUseCase } from './use-cases/get-water-consumption-history.use-case'

@Module({
  controllers: [WaterConsumptionHistoryController],
  providers: [
    PrismaService,
    GetWaterConsumptionHistoryUseCase,
    RequestContextService,
    {
      provide: WaterConsumptionHistoryRepository,
      useClass: PrismaWaterConsumptionHistoryRepository,
    },
  ],
})
export class WaterConsumptionHistoryModule {}
