import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

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
