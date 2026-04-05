import { SetMetadata } from '@nestjs/common'

export const RequireWorkoutConfig = () => SetMetadata('REQUIRE_WORKOUT_CONFIG', true)
