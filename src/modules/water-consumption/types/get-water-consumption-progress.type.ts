export type GetWaterConsumptionProgressOutput = {
  targetConsumptionInMl: number
  totalConsumedInMl: number
  consumptionProgress: number
  consumptionsHistory: {
    id: string
    amountConsumedInMl: number
    time: string
  }[]
}
