import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsInt, IsString, IsTimeZone } from 'class-validator'
import { BiologicalSex, Goal } from 'generated/prisma/enums'

export class CompleteProfileRequestDTO {
  @IsEnum(Goal)
  readonly goal: Goal

  @IsEnum(BiologicalSex)
  readonly biologicalSex: BiologicalSex

  @IsDate()
  @Type(() => Date)
  readonly birthDate: Date

  @IsInt()
  readonly heightInCentimeters: number

  @IsInt()
  readonly weightInGrams: number

  @IsInt()
  readonly targetWeightInGrams: number

  @IsTimeZone()
  @IsString()
  readonly timezone: string
}

export class CompleteProfileResponseDTO {
  @ApiProperty({ title: 'Profile ID', type: 'string', format: 'uuid ' })
  readonly id: string

  @ApiProperty({ title: 'User weight in grams', type: 'integer' })
  readonly weightInGrams: number

  @ApiProperty({ title: 'User target weight in grams', type: 'integer' })
  readonly targetWeightInGrams: number

  @ApiProperty({ title: 'User height in centimeters', type: 'integer' })
  readonly heightInCentimeters: number

  @ApiProperty({ title: 'User biological sex', enum: BiologicalSex })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ title: 'User timezone', example: 'America/Sao_Paulo', type: 'string' })
  readonly timezone: string

  @ApiProperty({ title: 'User birth date', type: 'string', format: 'date' })
  readonly birthDate: string

  @ApiProperty({ title: 'User goal', enum: Goal })
  readonly goal: Goal
}
