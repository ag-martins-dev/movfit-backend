export type GetWaterConsumptionHistoryInput = {
  fromDate: Date
  toDate: Date
}

export type GetWaterConsumptionHistoryRepositoryInput = {
  userId: string
  fromDate: Date | string
  toDate: Date | string
}

export type GetWaterConsumptionHistoryOutput = {
  range: {
    fromDate: string
    toDate: string
  }
  totalConsumedInMl: number
  consumptionHistory: {
    id: string
    amountConsumedInMl: number
    consumptionDate: string
    consumptionTime: string
  }[]
}
