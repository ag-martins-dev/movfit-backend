import { Type } from 'class-transformer'
import { IsUUID } from 'class-validator'

export class DeleteDietQueryDTO {
  @IsUUID()
  @Type(() => String)
  dietId: string
}
