import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { TransactionContextService } from './transaction-context.service'

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}

  async run<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      return this.transactionContext.run(tx, () => callback(tx))
    })
  }
}
