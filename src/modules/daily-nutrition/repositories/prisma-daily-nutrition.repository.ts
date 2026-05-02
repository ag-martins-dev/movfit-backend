import { Injectable } from '@nestjs/common'
import { DailyNutrition } from 'generated/prisma/client'
import { formatDateToISO } from 'src/common/helpers/format-date-to-iso.helper'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { GetNutritionInput, UpsertNutritionProgressInput } from '../types'
import { DailyNutritionRepository } from './daily-nutrition.repository'

@Injectable()
export class PrismaDailyNutritionRepository extends BaseRepository implements DailyNutritionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  private incrementIfDefined(value?: number) {
    return value !== undefined ? { increment: value } : undefined
  }

  async upsert(input: UpsertNutritionProgressInput): Promise<DailyNutrition> {
    return await this.db.dailyNutrition.upsert({
      where: {
        userId_day: {
          userId: input.userId,
          day: formatDateToISO(new Date(), input.timezone),
        },
      },
      create: {
        userId: input.userId,
        day: formatDateToISO(new Date(), input.timezone),
        carbsInGrams: input.carbsInGrams,
        fatsInGrams: input.fatsInGrams,
        proteinsInGrams: input.proteinsInGrams,
      },
      update: {
        carbsInGrams: this.incrementIfDefined(input.carbsInGrams),
        fatsInGrams: this.incrementIfDefined(input.fatsInGrams),
        proteinsInGrams: this.incrementIfDefined(input.proteinsInGrams),
      },
    })
  }

  async findOne(input: GetNutritionInput): Promise<DailyNutrition | null> {
    return await this.db.dailyNutrition.findFirst({
      where: {
        userId: input.userId,
        day: formatDateToISO(new Date(), input.timezone),
      },
    })
  }
}
