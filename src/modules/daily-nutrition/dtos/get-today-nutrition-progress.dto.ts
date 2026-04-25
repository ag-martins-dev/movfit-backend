import { ApiProperty } from '@nestjs/swagger'

class MacroProgressDto {
  @ApiProperty({ type: 'integer' })
  readonly targetInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly totalConsumptionInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly progress: number
}

export class GetTodayNutritionProgressResponseDto {
  @ApiProperty({ type: MacroProgressDto })
  readonly carbs: MacroProgressDto

  @ApiProperty({ type: MacroProgressDto })
  readonly proteins: MacroProgressDto

  @ApiProperty({ type: MacroProgressDto })
  readonly fats: MacroProgressDto
}
