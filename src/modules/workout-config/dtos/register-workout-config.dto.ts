import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { FocusMuscle } from 'generated/prisma/enums'

export class RegisterWorkoutConfigRequestDTO {
  @IsInt()
  @Min(1)
  @Max(7)
  readonly freeDaysPerWeek: number

  @IsInt()
  @Min(1)
  @Max(86_400)
  readonly freeTimeByDayInSeconds: number

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @IsEnum(FocusMuscle, { each: true })
  readonly focusMuscles?: FocusMuscle[]
}

export class RegisterWorkoutConfigResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Free days per week', type: 'integer', minimum: 1, maximum: 7 })
  readonly freeDaysPerWeek: number

  @ApiProperty({ title: 'Free time by day (s)', type: 'integer', minimum: 1, maximum: 86_399 })
  readonly freeTimeByDayInSeconds: number

  @ApiProperty({ title: 'Focus muscles (2 max)', enum: [FocusMuscle], isArray: true, maxItems: 2 })
  readonly focusMuscles: FocusMuscle[]

  @ApiProperty({ title: 'Created at', type: Date })
  readonly createdAt: Date
}
