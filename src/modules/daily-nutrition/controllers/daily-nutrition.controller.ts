import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { RequireActiveDiet } from 'src/common/decorators/require-active-diet.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ActiveDietInterceptor } from 'src/common/interceptors/active-diet.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { GetNutritionProgressUseCase } from 'src/modules/daily-nutrition/use-cases/get-nutrition-progress.use-case'
import { UpdateNutritionProgressUseCase } from 'src/modules/daily-nutrition/use-cases/update-nutrition-progress.use-case'
import {
  GetNutritionProgressResponseDTO,
  UpdateNutritionProgressRequestDTO,
  UpdateNutritionProgressResponseDTO,
} from '../dtos'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/daily-nutrition', version: '1' })
export class DailyNutritionController {
  constructor(
    private readonly getNutritionProgressUseCase: GetNutritionProgressUseCase,
    private readonly updateNutritionProgressUseCase: UpdateNutritionProgressUseCase,
  ) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @RequireProfile()
  @RequireActiveDiet()
  @UseInterceptors(ProfileInterceptor, ActiveDietInterceptor)
  @ApiOkResponse({ type: GetNutritionProgressResponseDTO })
  @Get()
  getNutritionProgress() {
    return this.getNutritionProgressUseCase.execute()
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @ApiCreatedResponse({ type: UpdateNutritionProgressResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Patch()
  updateNutritionProgress(@Body() body: UpdateNutritionProgressRequestDTO) {
    return this.updateNutritionProgressUseCase.execute({
      carbsInGrams: body.carbsInGrams,
      fatsInGrams: body.fatsInGrams,
      proteinsInGrams: body.proteinsInGrams,
    })
  }
}
