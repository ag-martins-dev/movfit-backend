import { BiologicalSex, Goal } from 'generated/prisma/enums'

export type CompleteProfileInput = {
  goal: Goal
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCentimeters: number
  weightInGrams: number
  targetWeightInGrams: number
  timezone: string
}

export type CompleteProfileRepositoryInput = CompleteProfileInput & {
  userId: string
}

export type CompleteProfileOutput = {
  id: string
  weightInGrams: number
  targetWeightInGrams: number
  heightInCentimeters: number
  biologicalSex: BiologicalSex
  timezone: string
  birthDate: string
  goal: Goal
}
