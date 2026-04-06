import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetWaterConsumptionHistoryQueryDTO } from '../dtos/get-water-consumption-history-query.dto'
import { GetWaterConsumptionHistoryUseCase } from '../use-cases/get-water-consumption-history.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/water-consumption-history', version: '1' })
export class WaterConsumptionHistoryController {
  constructor(
    private readonly getWaterConsumptionHistoryUseCase: GetWaterConsumptionHistoryUseCase,
  ) {}

  @Get()
  getWaterConsumptionHistory(
    @CurrentUser() user: AuthUser,
    @Query() query: GetWaterConsumptionHistoryQueryDTO,
  ) {
    return this.getWaterConsumptionHistoryUseCase.execute(user.id, query)
  }
}
