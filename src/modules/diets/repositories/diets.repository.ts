import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { CreateDietRepositoryInput } from '../types/create-diet.types'

@Injectable()
export abstract class DietsRepository {
  abstract findOne(dietId: string, userId: string): Promise<Diet | null>
  abstract findAll(userId: string): Promise<Diet[]>
  abstract findActive(userId: string): Promise<Diet | null>
  abstract create(input: CreateDietRepositoryInput): Promise<Diet>
  abstract deactivate(dietId: string, userId: string): Promise<Diet>
  abstract delete(dietId: string, userId: string): Promise<Diet>
}
