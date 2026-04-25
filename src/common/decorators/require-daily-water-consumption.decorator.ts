import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireDailyWaterConsumption = () => {
  return SetMetadata(constants.REQUIRE_DAILY_WATER_CONSUMPTION_KEY, true)
}
