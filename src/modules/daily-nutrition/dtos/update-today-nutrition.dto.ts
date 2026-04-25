import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsPositive } from 'class-validator'

export class UpdateTodayNutritionRequestDTO {
  @ApiProperty({ type: 'integer', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly proteinsInGrams?: number

  @ApiProperty({ type: 'integer', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly carbsInGrams?: number

  @ApiProperty({ type: 'integer', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly fatsInGrams?: number
}

export class UpdateTodayNutritionResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: Date })
  readonly day: Date

  @ApiProperty({ type: 'integer' })
  readonly proteinsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly carbsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly fatsInGrams: number
}
