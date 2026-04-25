import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireProfile = () => {
  return SetMetadata(constants.REQUIRE_PROFILE_KEY, true)
}
