import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetWorkoutConfigResponseDTO } from '../dtos/get-workout-config-response.dto'
import { RegisterWorkoutConfigRequestDTO, RegisterWorkoutConfigResponseDTO } from '../dtos/register-workout-config.dto'
import { GetWorkoutConfigUseCase } from '../use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from '../use-cases/register-workout-config.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/workout-config', version: '1' })
export class WorkoutConfigController {
  constructor(
    private readonly registerWorkoutConfigUseCase: RegisterWorkoutConfigUseCase,
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetWorkoutConfigResponseDTO })
  getWorkoutConfig(@CurrentUser() user: AuthUser) {
    return this.getWorkoutConfigUseCase.execute(user.id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: RegisterWorkoutConfigResponseDTO })
  registerWorkoutConfig(@Body() body: RegisterWorkoutConfigRequestDTO) {
    return this.registerWorkoutConfigUseCase.execute(body)
  }
}
