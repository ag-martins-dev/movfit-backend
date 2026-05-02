import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileModule } from 'src/modules/profile/profile.module'
import { UsersController } from 'src/modules/users/controller/users.controller'
import { PrismaUsersRepository } from 'src/modules/users/repositories/prisma-users-repository'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { MeUseCase } from 'src/modules/users/use-cases/me.use-case'
import { WorkoutConfigModule } from '../workout-config/workout-config.module'

@Module({
  imports: [WorkoutConfigModule, ProfileModule],
  controllers: [UsersController],
  exports: [UsersRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    MeUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
