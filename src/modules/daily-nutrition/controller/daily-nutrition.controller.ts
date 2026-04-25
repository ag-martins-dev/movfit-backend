import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { RequireActiveDiet } from 'src/common/decorators/require-active-diet.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ActiveDietInterceptor } from 'src/common/interceptors/active-diet.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { GetTodayNutritionProgressResponseDto } from '../dtos/get-today-nutrition-progress.dto'
import { UpdateTodayNutritionRequestDTO, UpdateTodayNutritionResponseDTO } from '../dtos/update-today-nutrition.dto'
import { GetTodayNutritionProgressUseCase } from '../use-cases/get-today-nutrition-progress.use-case'
import { UpdateTodayNutritionProgressUseCase } from '../use-cases/update-today-nutrition-progress.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/daily-nutrition', version: '1' })
export class DailyNutritionController {
  constructor(
    private readonly getTodayGetTodayNutritionProgressUseCase: GetTodayNutritionProgressUseCase,
    private readonly updateUpdateTodayNutritionProgressUseCase: UpdateTodayNutritionProgressUseCase,
  ) {}

  @Get()
  @RequireProfile()
  @RequireActiveDiet()
  @UseInterceptors(ProfileInterceptor, ActiveDietInterceptor)
  @ApiOkResponse({ type: GetTodayNutritionProgressResponseDto })
  getTodayNutritionProgress() {
    return this.getTodayGetTodayNutritionProgressUseCase.execute()
  }

  @Patch()
  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UpdateTodayNutritionResponseDTO })
  updateTodayNutritionProgress(@Body() body: UpdateTodayNutritionRequestDTO) {
    return this.updateUpdateTodayNutritionProgressUseCase.execute({
      carbsInGrams: body.carbsInGrams,
      fatsInGrams: body.fatsInGrams,
      proteinsInGrams: body.proteinsInGrams,
    })
  }
}
