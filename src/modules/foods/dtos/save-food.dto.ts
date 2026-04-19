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
