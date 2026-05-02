export const getTodayInTimezone = (timezone: string): Date => {
  const now = new Date()

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const formattedDate = formatter.format(now)
  const [year, month, day] = formattedDate.split('/').map(Number)

  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
}
