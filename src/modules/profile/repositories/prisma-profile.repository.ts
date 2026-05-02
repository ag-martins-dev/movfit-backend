import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository'
import { CompleteProfileRepositoryInput } from 'src/modules/profile/types'

@Injectable()
export class PrismaProfileRepository extends BaseRepository implements ProfileRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(userId: string): Promise<Profile | null> {
    return await this.db.profile.findFirst({
      where: { userId },
    })
  }

  async upsert(input: CompleteProfileRepositoryInput): Promise<Profile> {
    return await this.db.$transaction(async (tx) => {
      const updatedProfile = await tx.profile.upsert({
        where: { userId: input.userId },
        create: {
          userId: input.userId,
          biologicalSex: input.biologicalSex,
          birthDate: input.birthDate,
          goal: input.goal,
          heightInCentimeters: input.heightInCentimeters,
          targetWeightInGrams: input.targetWeightInGrams,
          weightInGrams: input.weightInGrams,
          timezone: input.timezone,
        },
        update: input,
      })

      await tx.user.update({
        where: { id: input.userId, isOnboardingCompleted: { equals: false } },
        data: { isOnboardingCompleted: true },
      })

      return updatedProfile
    })
  }
}
