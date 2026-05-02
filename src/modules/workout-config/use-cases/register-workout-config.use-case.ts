import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'
import { RegisterWorkoutConfigInput, RegisterWorkoutConfigOutput } from '../types/register-workout-config.type'

@Injectable()
export class RegisterWorkoutConfigUseCase {
  constructor(
    private readonly workoutConfigRepository: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: RegisterWorkoutConfigInput): Promise<RegisterWorkoutConfigOutput> {
    const userId = this.requestContext.getUserId

    const workoutConfig = await this.workoutConfigRepository.create({
      userId,
      freeDaysPerWeek: input.freeDaysPerWeek,
      freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
      focusMuscles: input.focusMuscles,
    })

    return {
      id: workoutConfig.id,
      focusMuscles: workoutConfig.focusMuscles,
      freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
      createdAt: workoutConfig.createdAt,
    }
  }
}
