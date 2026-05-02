import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from 'generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaNeon({
      connectionString: configService.getOrThrow<string>('DATABASE_URL'),
    })

    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
