import { Body, Controller, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CompleteProfileRequestDTO, CompleteProfileResponseDTO } from 'src/modules/profile/dtos'
import { CompleteProfileUseCase } from 'src/modules/profile/use-cases/complete-profile.use-case'

@UseGuards(JwtAuthGuard)
@Controller({ path: '/profile', version: '1' })
export class ProfileController {
  constructor(private readonly completeProfileUseCase: CompleteProfileUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: CompleteProfileResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Patch()
  completeProfile(@Body() body: CompleteProfileRequestDTO) {
    return this.completeProfileUseCase.execute(body)
  }
}
