import { ApiProperty } from '@nestjs/swagger/dist'

export class DailyConsumptionDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Amount consumed (ml)', type: 'integer', minimum: 1 })
  readonly amountConsumedInMl: number

  @ApiProperty({ title: 'Time', type: 'string', format: 'time' })
  readonly time: string
}

export class GetWaterConsumptionProgressResponseDTO {
  @ApiProperty({ title: 'Target consumption (ml)', type: 'integer', minimum: 1 })
  readonly targetConsumptionInMl: number

  @ApiProperty({ title: 'Total consumed (ml)', type: 'integer', minimum: 1 })
  readonly totalConsumedInMl: number

  @ApiProperty({ title: 'Consumption progress (%)', type: 'integer', maximum: 100 })
  readonly consumptionProgress: number

  @ApiProperty({ title: 'Today consumptions', type: [DailyConsumptionDTO], isArray: true })
  readonly todayConsumptions: DailyConsumptionDTO[]
}
