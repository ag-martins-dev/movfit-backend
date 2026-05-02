import { Injectable } from '@nestjs/common'
import { DailyNutrition } from 'generated/prisma/client'
import { GetNutritionInput, UpsertNutritionProgressInput } from '../types'

@Injectable()
export abstract class DailyNutritionRepository {
  abstract findOne(input: GetNutritionInput): Promise<DailyNutrition | null>
  abstract upsert(input: UpsertNutritionProgressInput): Promise<DailyNutrition>
}
