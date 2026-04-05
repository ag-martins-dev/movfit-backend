import 'dotenv/config'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controller/auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { SigninUseCase } from './use-cases/signin.use-case'
import { SignupUseCase } from './use-cases/signup.use-case'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        issuer: process.env.JWT_TOKEN_ISSUER as string,
        audience: process.env.JWT_TOKEN_AUDIENCE as string,
        expiresIn: '7d',
      },
      verifyOptions: {
        issuer: process.env.JWT_TOKEN_ISSUER as string,
        audience: process.env.JWT_TOKEN_AUDIENCE as string,
        ignoreExpiration: false,
      },
    }),
  ],
  controllers: [AuthController],
  exports: [SigninUseCase, SignupUseCase],
  providers: [SigninUseCase, SignupUseCase, JwtStrategy],
})
export class AuthModule {}
