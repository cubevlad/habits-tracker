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
  started_at: string
  archived_at: string | null
  accountId: string
  records: HabitRecord[]
}
