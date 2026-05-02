import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { AuthResponseDTO } from 'src/modules/auth/dtos/auth.dto'
import { SigninDTO } from 'src/modules/auth/dtos/signin.dto'
import { SignupDTO } from 'src/modules/auth/dtos/signup.dto'
import { SigninUseCase } from 'src/modules/auth/use-cases/signin.use-case'
import { SignupUseCase } from 'src/modules/auth/use-cases/signup.use-case'

@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: AuthResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signin')
  async signin(@Body() body: SigninDTO) {
    return this.signinUseCase.execute(body)
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: AuthResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signup(@Body() body: SignupDTO) {
    return this.signupUseCase.execute(body)
  }
}
