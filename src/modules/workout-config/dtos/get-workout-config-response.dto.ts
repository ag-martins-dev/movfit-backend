import { ApiProperty } from '@nestjs/swagger'
import { FocusMuscle } from 'generated/prisma/enums'
export class GetWorkoutConfigResponseDTO {
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
