import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DailyNutritionController } from 'src/modules/daily-nutrition/controllers/daily-nutrition.controller'
import { DailyNutritionRepository } from 'src/modules/daily-nutrition/repositories/daily-nutrition.repository'
import { PrismaDailyNutritionRepository } from 'src/modules/daily-nutrition/repositories/prisma-daily-nutrition.repository'
import { GetNutritionProgressUseCase } from 'src/modules/daily-nutrition/use-cases/get-nutrition-progress.use-case'
import { UpdateNutritionProgressUseCase } from 'src/modules/daily-nutrition/use-cases/update-nutrition-progress.use-case'
import { DailyWaterConsumptionModule } from 'src/modules/daily-water-consumption/daily-water-consumption.module'
import { DietsModule } from 'src/modules/diets/diets.module'
import { ProfileModule } from 'src/modules/profile/profile.module'
import { UsersModule } from 'src/modules/users/users.module'

@Module({
  imports: [DailyWaterConsumptionModule, UsersModule, ProfileModule, DietsModule],
  controllers: [DailyNutritionController],
  exports: [DailyNutritionRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    GetNutritionProgressUseCase,
    UpdateNutritionProgressUseCase,
    {
      provide: DailyNutritionRepository,
      useClass: PrismaDailyNutritionRepository,
    },
  ],
})
export class DailyNutritionModule {}
