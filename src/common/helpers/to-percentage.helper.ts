export function toPercentage(goal: number, current: number): number {
  if (goal === 0) return 0
  return Math.floor(Math.min((current / goal) * 100, 100))
}
