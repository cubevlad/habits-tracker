export type HabitRecord = {
  id: string
  habitId: string
  done: boolean
  date: string
}

export type Habit = {
  id: string
  name: string
  description: string | null
  goal: number
  startedAt: Date | string
  archivedAt: string | null
  accountId: string
  achieved: number
  records: HabitRecord[]
}
