import { format } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'

import type { Api } from '@shared/api'
import { createFlatList, getFirstAndLastDayOfMonth } from '@shared/lib'
import type { Habit, HabitRecord } from '@shared/types'

export class HabitsStore {
  private readonly transportLayer: Api

  habits: Habit[] = []

  flatHabitsList: Record<string, Habit> = {}

  constructor(api: Api) {
    this.transportLayer = api

    makeAutoObservable(this)
  }

  fetchHabits = async (date: Date) => {
    const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(date)

    const formattedFirst = format(firstDayOfMonth, 'yyyy-MM-dd')
    const formattedLast = format(lastDayOfMonth, 'yyyy-MM-dd')

    const habits = await this.transportLayer.habitsService.habits.getHabits({
      start_date: formattedFirst,
      end_date: formattedLast,
    })

    const flatHabitsList = createFlatList({
      list: habits,
      newListValuesType: 'obj',
    })

    runInAction(() => {
      this.habits = habits
      this.flatHabitsList = flatHabitsList
    })
  }

  createHabit = async (habit: Pick<Habit, 'goal' | 'name'>) => {
    const habitFromServer = await this.transportLayer.habitsService.habits.createHabit(habit)

    runInAction(() => {
      this.habits.push(habitFromServer)
      this.flatHabitsList[habitFromServer.id] = habitFromServer
    })
  }

  updateHabit = async (habit: Pick<Habit, 'goal' | 'id' | 'name'>) => {
    const habitFromServer = await this.transportLayer.habitsService.habits.updateHabit(habit)

    runInAction(() => {
      this.habits = this.habits.map((item) => (item.id === habit.id ? habitFromServer : item))
      this.flatHabitsList[habitFromServer.id] = habitFromServer
    })
  }

  updateHabitRecord = async (record: HabitRecord) => {
    const recordFromServer =
      await this.transportLayer.habitsService.habits.updateHabitRecord(record)

    runInAction(() => {
      const records = this.habits.find((item) => item.id === record.habitId)?.records ?? []
      const habitsRecord = this.flatHabitsList[record.habitId]?.records ?? []

      const recordIndex = records.findIndex((item) => item.id === record.id)
      if (recordIndex !== -1) {
        records[recordIndex] = recordFromServer
        habitsRecord[recordIndex] = recordFromServer
      }
    })
  }

  deleteHabit = async (id: string) => {
    await this.transportLayer.habitsService.habits.deleteHabit(id)

    runInAction(() => {
      this.habits = this.habits.filter((habit) => habit.id !== id)
      delete this.flatHabitsList[id]
    })
  }
}
