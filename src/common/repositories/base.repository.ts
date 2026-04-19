import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { TransactionContextService } from '../services/transaction-context.service'

@Injectable()
export abstract class BaseRepository {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly transactionContext: TransactionContextService,
  ) {}

  protected get db() {
    return this.transactionContext.get() ?? this.prisma
  }
}
