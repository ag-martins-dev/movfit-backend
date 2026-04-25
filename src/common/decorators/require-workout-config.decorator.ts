import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireWorkoutConfig = () => {
  return SetMetadata(constants.REQUIRE_WORKOUT_CONFIG_KEY, true)
}
