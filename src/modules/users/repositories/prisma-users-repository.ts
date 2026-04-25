import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { AuthUser, AuthUserWithProfile } from 'src/common/types/auth-user.types'
import { PublicUser } from 'src/common/types/public-user.types'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CreateUserInput } from '../types/create-user.type'
import { SelectTimezone, UserWithDietsAndTimezone, UserWithProfile } from '../types/users.type'
import { UsersRepository } from './users-repository'

@Injectable()
export class PrismaUsersRepository extends BaseRepository implements UsersRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async me(userId: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { id: userId },
      include: { profile: true, workoutConfig: true },
    })
  }

  async create(input: CreateUserInput): Promise<PublicUser> {
    const user = await this.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.password,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
    }
  }

  async getById(userId: string): Promise<AuthUser | null> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      isOnboardingCompleted: user.isOnboardingCompleted,
    }
  }

  async getByEmail(email: string): Promise<PublicUser | null> {
    const user = await this.db.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
    }
  }

  async getByEmailForAuth(email: string): Promise<AuthUser | null> {
    const user = await this.db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
      passwordHash: user.passwordHash,
    }
  }

  async getAuthUserWithProfile(userId: string): Promise<AuthUserWithProfile | null> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
      name: user.name,
      passwordHash: user.passwordHash,
      profile: user.profile,
    }
  }

  async findWithProfile(userId: string): Promise<UserWithProfile | null> {
    const userWithProfile = await this.db.user.findUnique({
      where: { id: userId },
      select: { profile: true },
    })
    return userWithProfile
  }

  async findWithTimezone(userId: string): Promise<SelectTimezone | null> {
    const userTimezone = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        profile: {
          select: { timezone: true },
        },
      },
    })
    return userTimezone
  }

  async findWithDietsAndTimezone(userId: string): Promise<UserWithDietsAndTimezone | null> {
    const userWithDietsAndTimezone = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        diets: true,
        profile: {
          select: { timezone: true },
        },
      },
    })
    return userWithDietsAndTimezone
  }
}
