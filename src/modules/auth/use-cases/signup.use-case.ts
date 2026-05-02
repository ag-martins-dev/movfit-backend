import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { Payload, SignupInput, SignupOutput } from 'src/modules/auth/types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const hashSalt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(input.password, hashSalt)
    const user = await this.usersRepository.findOneByEmail(input.email)

    if (user) throw new ConflictException('E-mail already in use.')

    const newUser = await this.usersRepository.create({ ...input, password: hash })
    const accessToken = await this.jwtService.signAsync<Payload>({ sub: newUser.id })

    return {
      accessToken,
    }
  }
}
