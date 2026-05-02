import { ApiProperty } from '@nestjs/swagger/dist'
import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'
import { NutritionalInfosDTO } from 'src/modules/foods/dtos/save-food.dto'

export class FoodDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'Category', type: 'string' })
  readonly category: string

  @ApiProperty({ title: 'Normalized nutritional infos', type: NutritionalInfosDTO })
  readonly normalizedNutritionalInfos: NutritionalInfosDTO
}

export class SearchFoodsQueryDTO {
  @IsString()
  @IsOptional()
  readonly category?: string

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly offset?: number

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined
    } else if (value === 'false') {
      return false
    }
    return true
  })
  readonly isRecipe?: boolean
}

export class SearchFoodsResponseDTO {
  @ApiProperty({ title: 'Founded foods', type: 'integer' })
  readonly foundedFoods: number

  @ApiProperty({ title: 'Foods', type: [FoodDTO], isArray: true })
  readonly foods: FoodDTO[]
}
