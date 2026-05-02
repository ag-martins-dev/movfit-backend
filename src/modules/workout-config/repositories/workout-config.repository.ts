import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { RegisterWorkoutConfigRepositoryInput } from 'src/modules/workout-config/types'

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract findOne(userId: string): Promise<WorkoutConfig | null>
  abstract create(input: RegisterWorkoutConfigRepositoryInput): Promise<WorkoutConfig>
}
