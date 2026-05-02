import { ApiProperty } from '@nestjs/swagger'

class MacroProgressDTO {
  @ApiProperty({ title: 'Target (g)', type: 'integer', minimum: 1 })
  readonly targetInGrams: number

  @ApiProperty({ title: 'Total consumption (g)', type: 'integer' })
  readonly totalConsumptionInGrams: number

  @ApiProperty({ title: 'Progress (%)', type: 'integer', maximum: 100 })
  readonly progress: number
}

export class GetNutritionProgressResponseDTO {
  @ApiProperty({ title: 'Carbohydrates progress', type: MacroProgressDTO })
  readonly carbs: MacroProgressDTO

  @ApiProperty({ title: 'Proteins progress', type: MacroProgressDTO })
  readonly proteins: MacroProgressDTO

  @ApiProperty({ title: 'Fats progress', type: MacroProgressDTO })
  readonly fats: MacroProgressDTO
}
