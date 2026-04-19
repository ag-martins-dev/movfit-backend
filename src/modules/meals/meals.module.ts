import { Module } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { MealsRepository } from './repositories/meals.repository'
import { PrismaMealsRepository } from './repositories/prisma-diet-meals.repository'

@Module({
  exports: [MealsRepository],
  providers: [
    PrismaService,
    {
      provide: MealsRepository,
      useClass: PrismaMealsRepository,
    },
  ],
})
export class MealsModule {}
