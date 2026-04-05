import { SetMetadata } from '@nestjs/common'

export const RequireProfile = () => SetMetadata('REQUIRE_PROFILE', true)
