import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { DietGoal, PortionUnit } from 'generated/prisma/enums'

class FoodDTO {
  @IsUUID()
  foodId: string

  @IsInt()
  @Min(1)
  amount: number

  @IsEnum(PortionUnit)
  unit: PortionUnit
}

class MealDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsInt()
  @Min(0)
  @Max(1439)
  timeInMinutes: number

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FoodDTO)
  foods: FoodDTO[]
}

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

export class CreateDietRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(DietGoal)
  goal: DietGoal

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MealDTO)
  meals: MealDTO[]
}

export class CreateDietResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'boolean', default: false })
  readonly isActive: boolean

  @ApiProperty({ enum: DietGoal })
  readonly goal: DietGoal

  @ApiProperty({ type: MacrosDTO })
  readonly macros: MacrosDTO
}
