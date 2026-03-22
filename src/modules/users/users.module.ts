import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { UpdateUserMetricsUseCase } from './use-cases/update-user-metrics.use-case';

@Module({
  exports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    UpdateUserMetricsUseCase,
    GetMeUseCase,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
