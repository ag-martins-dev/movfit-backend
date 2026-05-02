import { ApiProperty } from '@nestjs/swagger'

export class RegisterWaterConsumptionResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Amount consumed (ml)', type: 'integer', minimum: 1 })
  readonly amountConsumedInMl: number

  @ApiProperty({ title: 'Consumption date', type: 'string', format: 'date', example: '01/05/2026' })
  readonly consumptionDate: string

  @ApiProperty({ title: 'Consumption time', type: 'string', format: 'time', example: '23:59:59' })
  readonly consumptionTime: string
}
