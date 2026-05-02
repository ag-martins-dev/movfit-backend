import { parseDateString } from './parse-date-string.helper'

export const formatDateStringToDate = (date: string): Date => {
  return parseDateString(date)
}
