import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { LoginInputDto } from '../dtos/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { ApiResponse } from '@nestjs/swagger';
import { SignupUseCase } from '../use-cases/signup.use-case';
import { SignupInputDto } from '../dtos/signup.dto';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

@Controller({
  path: '/auth',
  version: '3',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          format: 'password',
          uniqueItems: true,
        },
      },
    },
  })
  @Post('/login')
  async login(@Body(new ValidationPipe()) dto: LoginInputDto) {
    return this.loginUseCase.execute(dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'SignUp.',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          format: 'password',
          uniqueItems: true,
        },
      },
    },
  })
  @Post('/sign-up')
  async signUp(@Body(new ValidationPipe()) dto: SignupInputDto) {
    return this.signupUseCase.execute(dto);
  }
}
