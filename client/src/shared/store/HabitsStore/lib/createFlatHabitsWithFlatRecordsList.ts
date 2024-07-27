import type { Habit, HabitRecord } from '@shared/types'

export const createFlatRecordsList = (habit: Habit) => {
  const records: Record<string, HabitRecord> = {}

  habit.records.forEach((record) => {
    records[record.date] = record
  })

  return records
}

export const createFlatHabitsWithFlatRecordsList = (
  habits: Habit[]
): Record<string, Record<string, HabitRecord>> => {
  const rec: Record<string, Record<string, HabitRecord>> = {}

  habits.forEach((habit) => {
    rec[habit.id] = {
      ...createFlatRecordsList(habit),
    }
  })

  return rec
}
