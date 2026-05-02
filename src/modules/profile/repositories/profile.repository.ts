import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/browser'
import { CompleteProfileRepositoryInput } from '../types/complete-profile.type'

@Injectable()
export abstract class ProfileRepository {
  abstract findOne(userId: string): Promise<Profile | null>
  abstract upsert(input: CompleteProfileRepositoryInput): Promise<Profile>
}
