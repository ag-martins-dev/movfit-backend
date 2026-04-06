import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { WaterConsumptionController } from './controller/water-consumption.controller'
import { PrismaWaterConsumptionRepository } from './repositories/prisma-water-consumption.repository'
import { WaterConsumptionRepository } from './repositories/water-consumption.repository'
import { GetTodayWaterConsumptionProgressUseCase } from './use-cases/get-today-water-consumption-progress.use-case'
// import { RegisterTodayWaterConsumptionUseCase } from './use-cases/register-today-water-consumption.use-case'

@Module({
  imports: [UsersModule],
  controllers: [WaterConsumptionController],
  exports: [WaterConsumptionRepository],
  providers: [
    PrismaService,
    RequestContextService,
    // RegisterTodayWaterConsumptionUseCase,
    GetTodayWaterConsumptionProgressUseCase,
    {
      provide: WaterConsumptionRepository,
      useClass: PrismaWaterConsumptionRepository,
    },
  ],
})
export class WaterConsumptionModule {}
