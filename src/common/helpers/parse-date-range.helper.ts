import { parseDateString } from './parse-date-string.helper'

export const parseDateRange = (fromDateString: string, toDateString: string): [Date, Date] => {
  const fromDate = parseDateString(fromDateString)
  const toDate = new Date(parseDateString(toDateString))

  toDate.setUTCHours(23, 59, 59, 999)

  return [fromDate, toDate]
}
