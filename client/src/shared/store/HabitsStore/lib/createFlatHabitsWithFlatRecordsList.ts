import type { Habit, HabitRecord } from '@shared/types'

export const createFlatHabitsWithFlatRecordsList = (
  habits: Habit[]
): Record<string, Record<string, HabitRecord>> => {
  const rec: Record<string, Record<string, HabitRecord>> = {}

  habits.forEach(({ id, records }) => {
    rec[id] = {}

    records.forEach((record) => {
      rec[id][record.date] = record
    })
  })

  return rec
}
