import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user.isOnboardingCompleted) {
      return false
    }

    return true
  }
}
