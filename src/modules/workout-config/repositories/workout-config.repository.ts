import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { RegisterWorkoutConfigInput } from '../types/register-workout-config.type'

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract get(userId: string): Promise<WorkoutConfig | null>
  abstract register(userId: string, input: RegisterWorkoutConfigInput): Promise<WorkoutConfig>
}
