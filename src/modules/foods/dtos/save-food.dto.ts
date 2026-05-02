import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNotEmpty, IsObject, IsString, Min, ValidateNested } from 'class-validator'
import { PortionUnit } from 'generated/prisma/enums'

class PortionDTO {
  @IsInt()
  @Min(1)
  readonly amount: number

  @IsEnum(PortionUnit)
  readonly unit: PortionUnit
}

export class NutritionalInfosDTO {
  @ApiProperty({ title: 'Calories in kcal', type: 'number' })
  caloriesInKcal: number

  @ApiProperty({ title: 'Proteins in grams', type: 'number' })
  proteinsInGrams: number

  @ApiProperty({ title: 'Carbs in grams', type: 'number' })
  carbsInGrams: number

  @ApiProperty({ title: 'Fats in grams', type: 'number' })
  fatsInGrams: number
}

export class SaveFoodRequestDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly category: string

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PortionDTO)
  readonly portion: PortionDTO

  @IsInt()
  readonly caloriesInKcal: number

  @IsInt()
  readonly proteinsInGrams: number

  @IsInt()
  readonly carbsInGrams: number

  @IsInt()
  readonly fatsInGrams: number
}

export class SaveFoodResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'Category', type: 'string' })
  readonly category: string

  @ApiProperty({ title: 'Description', type: 'string', nullable: true })
  readonly description: string | null

  @ApiProperty({ title: 'Amount', type: 'integer' })
  readonly amount: number

  @ApiProperty({ title: 'Unit', enum: PortionUnit })
  readonly unit: PortionUnit

  @ApiProperty({ title: 'Nutritional infos', type: NutritionalInfosDTO })
  readonly nutritionalInfos: NutritionalInfosDTO

  @ApiProperty({ title: 'Normalized nutritional infos', type: NutritionalInfosDTO })
  readonly normalizedNutritionalInfos: NutritionalInfosDTO
}
