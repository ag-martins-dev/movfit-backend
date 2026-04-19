import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { CreateDietRepositoryInput } from '../types/create-diet.types'

@Injectable()
export abstract class DietsRepository {
  abstract getOne(dietId: string, userId: string): Promise<Diet | null>
  abstract getAll(userId: string): Promise<Diet[]>
  abstract getActive(userId: string): Promise<Diet | null>
  abstract create(userId: string, input: CreateDietRepositoryInput): Promise<Diet>
  abstract deactive(dietId: string, userId: string): Promise<void>
  abstract delete(dietId: string): Promise<void>
}
