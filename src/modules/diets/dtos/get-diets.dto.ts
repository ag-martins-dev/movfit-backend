import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'
import { DietGoal } from 'generated/prisma/enums'

class MacrosDTO {
  @ApiProperty({ type: 'integer' })
  readonly caloriesInKcal: number

  @ApiProperty({ type: 'integer' })
  readonly proteinsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly carbsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly fatsInGrams: number
}

export class GetDietsQueryDTO {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly isActive?: boolean
}

export class GetDietsResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'boolean', default: false })
  readonly isActive: boolean

  @ApiProperty({ enum: DietGoal })
  readonly goal: DietGoal

  @ApiProperty({ type: Date })
  readonly createdAt: Date

  @ApiProperty({ type: MacrosDTO })
  readonly macros: MacrosDTO
}
