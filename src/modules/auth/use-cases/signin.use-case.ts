import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { Payload, SigninInput, SigninOutput } from 'src/modules/auth/types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SigninInput): Promise<SigninOutput> {
    const user = await this.usersRepository.findOneByEmail(input.email)

    if (!user) throw new BadRequestException('Invalid e-mail or password.')

    const isPasswordMatch = await bcrypt.compare(input.password, user.passwordHash)

    if (!isPasswordMatch) throw new BadRequestException('Invalid e-mail or password.')

    const accessToken = await this.jwtService.signAsync<Payload>({ sub: user.id })

    return { accessToken }
  }
}
