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

export class CreateDietRequestBodyDTO {
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
