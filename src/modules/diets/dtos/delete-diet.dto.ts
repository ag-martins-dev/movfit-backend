import { Type } from 'class-transformer'
import { IsUUID } from 'class-validator'

export class DeleteDietDTO {
  @IsUUID()
  @Type(() => String)
  dietId: string
}
