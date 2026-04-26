import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from 'node_modules/@nestjs/throttler/dist'
import { SigninRequestDto, SigninResponseDto } from '../dtos/signin.dto'
import { SignupRequestDto, SignupResponseDto } from '../dtos/signup.dto'
import { SigninUseCase } from '../use-cases/signin.use-case'
import { SignupUseCase } from '../use-cases/signup.use-case'

@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: SigninResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signin')
  async signin(@Body() dto: SigninRequestDto) {
    return this.signinUseCase.execute(dto)
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: SignupResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signup(@Body() dto: SignupRequestDto) {
    return this.signupUseCase.execute(dto)
  }
}
