import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger/dist'
import { Throttle } from '@nestjs/throttler/dist'
import { RequireDailyWaterConsumption } from 'src/common/decorators/require-daily-water-consumption.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { DailyWaterConsumptionInterceptor } from 'src/common/interceptors/daily-water-consumption.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import {
  GetWaterConsumptionHistoryQueryDTO,
  GetWaterConsumptionHistoryResponseDTO,
  GetWaterConsumptionProgressResponseDTO,
  RegisterWaterConsumptionResponseDTO,
} from 'src/modules/water-consumption/dtos'
import { GetWaterConsumptionHistoryUseCase } from 'src/modules/water-consumption/use-cases/get-water-consumption-history.use-case'
import { GetWaterConsumptionProgressUseCase } from 'src/modules/water-consumption/use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from 'src/modules/water-consumption/use-cases/register-water-consumption.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/water-consumption', version: '1' })
export class WaterConsumptionController {
  constructor(
    private readonly getWaterConsumptionHistoryUseCase: GetWaterConsumptionHistoryUseCase,
    private readonly getWaterConsumptionProgressUseCase: GetWaterConsumptionProgressUseCase,
    private readonly registerWaterConsumptionUseCase: RegisterWaterConsumptionUseCase,
  ) {}

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @ApiOkResponse({ type: GetWaterConsumptionHistoryResponseDTO, schema: { nullable: true } })
  @Get('/history')
  getWaterConsumptionHistory(@Query() query: GetWaterConsumptionHistoryQueryDTO) {
    return this.getWaterConsumptionHistoryUseCase.execute(query)
  }

  @RequireProfile()
  @RequireDailyWaterConsumption()
  @UseInterceptors(DailyWaterConsumptionInterceptor, ProfileInterceptor)
  @ApiOkResponse({ type: GetWaterConsumptionProgressResponseDTO })
  @Get('/progress')
  getWaterConsumptionProgress() {
    return this.getWaterConsumptionProgressUseCase.execute()
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @RequireProfile()
  @RequireDailyWaterConsumption()
  @UseInterceptors(DailyWaterConsumptionInterceptor, ProfileInterceptor)
  @ApiCreatedResponse({ type: RegisterWaterConsumptionResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Patch()
  registerWaterConsumption(@Body('amountConsumedInMl', ParseIntPipe) amountConsumedInMl: number) {
    return this.registerWaterConsumptionUseCase.execute(amountConsumedInMl)
  }
}
