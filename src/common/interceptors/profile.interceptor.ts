import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class ProfileInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileRepo: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireProfile = this.reflector.get('REQUIRE_PROFILE', context.getHandler())

    if (requireProfile) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const profile = await this.profileRepo.getProfile(user.id)

      if (!profile) {
        throw new InternalServerErrorException(
          'Profile inconsistency: expected profile but not found.',
        )
      }

      this.requestContext.setProfile = profile

      return next.handle()
    }

    return next.handle()
  }
}
