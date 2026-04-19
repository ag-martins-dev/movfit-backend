import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CompleteProfileRequest } from '../types/complete-profile.type'
import { ProfileRepository } from './profile.repository'

@Injectable()
export class PrismaProfileRepository extends BaseRepository implements ProfileRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async completeProfile(userId: string, input: CompleteProfileRequest) {
    await this.db.$transaction(async (tx) => {
      tx.profile.upsert({
        where: { userId },
        create: { userId, ...input },
        update: input,
      })
      tx.user.update({
        where: { id: userId, isOnboardingCompleted: { equals: false } },
        data: { isOnboardingCompleted: true },
      })
    })
  }

  async getProfile(userId: string): Promise<Profile | null> {
    return await this.db.profile.findFirst({
      where: { userId },
    })
  }
}
