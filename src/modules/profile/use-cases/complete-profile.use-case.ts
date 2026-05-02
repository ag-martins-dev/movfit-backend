import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository'
import { CompleteProfileInput, CompleteProfileOutput } from '../types/complete-profile.type'

@Injectable()
export class CompleteProfileUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: CompleteProfileInput): Promise<CompleteProfileOutput> {
    const userId = this.requestContext.getUserId

    const updatedProfile = await this.profileRepository.upsert({ userId, ...input })

    return {
      id: updatedProfile.id,
      weightInGrams: updatedProfile.weightInGrams,
      targetWeightInGrams: updatedProfile.targetWeightInGrams,
      heightInCentimeters: updatedProfile.heightInCentimeters,
      biologicalSex: updatedProfile.biologicalSex,
      timezone: updatedProfile.timezone,
      birthDate: updatedProfile.birthDate.toLocaleDateString('pt-BR', { timeZone: updatedProfile.timezone }),
      goal: updatedProfile.goal,
    }
  }
}
