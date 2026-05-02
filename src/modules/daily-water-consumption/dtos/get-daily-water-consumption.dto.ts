import { ApiProperty } from '@nestjs/swagger'

export class GetDailyWaterConsumptionResponseDTO {
  @ApiProperty({ title: 'Consumption target (ml)', type: 'integer', minimum: 1 })
  readonly consumptionTargetInMl: number
}
