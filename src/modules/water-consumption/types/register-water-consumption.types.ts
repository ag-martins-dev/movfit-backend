export type RegisterWaterConsumptionRepositoryInput = {
  userId: string
  dailyWaterConsumptionId: string
  dateOfConsumption: Date
  amountConsumedInMl: number
}

export type RegisterWaterConsumptionOutput = {
  id: string
  amountConsumedInMl: number
  consumptionDate: string
  consumptionTime: string
}
