import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileController } from 'src/modules/profile/controller/profile.controller'
import { PrismaProfileRepository } from 'src/modules/profile/repositories/prisma-profile.repository'
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository'
import { CompleteProfileUseCase } from 'src/modules/profile/use-cases/complete-profile.use-case'

@Module({
  controllers: [ProfileController],
  exports: [ProfileRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    CompleteProfileUseCase,
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
})
export class ProfileModule {}
