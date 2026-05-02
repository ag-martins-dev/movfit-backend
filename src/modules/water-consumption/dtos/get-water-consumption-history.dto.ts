import { ApiProperty } from '@nestjs/swagger/dist'
import { Transform } from 'class-transformer'
import { IsDate } from 'class-validator'
import { parseDateToBrFormat } from 'src/common/helpers'

export class GetWaterConsumptionHistoryQueryDTO {
  @IsDate()
  @Transform(({ value }) => parseDateToBrFormat(value))
  readonly fromDate: Date

  @IsDate()
  @Transform(({ value }) => parseDateToBrFormat(value))
  readonly toDate: Date
}

class RangeDTO {
  @ApiProperty({ title: 'From date', type: 'string', format: 'date', example: '01/05/2026' })
  readonly from: string

  @ApiProperty({ title: 'To date', type: 'string', format: 'date', example: '31/05/2026' })
  readonly to: string
}

class WaterConsumptionDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Amount consumed (ml)', type: 'integer', minimum: 1 })
  readonly amountConsumedInMl: number

  @ApiProperty({ title: 'Date', type: 'string', format: 'date', example: '01/05/2026' })
  readonly date: string

  @ApiProperty({ title: 'Time', type: 'string', format: 'time' })
  readonly time: string
}

export class GetWaterConsumptionHistoryResponseDTO {
  @ApiProperty({ title: 'Range', type: RangeDTO })
  readonly range: RangeDTO

  @ApiProperty({ title: 'Total consumed (ml)', type: 'integer', minimum: 1 })
  readonly totalConsumedInMl: number

  @ApiProperty({ title: 'Consumption history', type: [WaterConsumptionDTO], isArray: true })
  readonly consumptionHistory: WaterConsumptionDTO[]
}
