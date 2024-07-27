import { format } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'

import type { Api } from '@shared/api'
import { getFirstAndLastDayOfMonth } from '@shared/lib'
import type { Habit, HabitRecord } from '@shared/types'

import { createFlatHabitsWithFlatRecordsList, createFlatRecordsList } from './lib'

export class HabitsStore {
  private readonly transportLayer: Api

  habits: Habit[] = []

  /** Flat list of habits with flat list of records by date */
  flatHabitsWithFlatRecordsList: Record<string, Record<string, HabitRecord>> = {}

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

    const flatHabitsWithFlatRecordsList = createFlatHabitsWithFlatRecordsList(habits)

    runInAction(() => {
      this.habits = habits
      this.flatHabitsWithFlatRecordsList = flatHabitsWithFlatRecordsList
    })
  }

  createHabit = async (habit: Pick<Habit, 'goal' | 'name' | 'startedAt'>) => {
    const habitFromServer = await this.transportLayer.habitsService.habits.createHabit(habit)
    const habitFromServerWithFlatRecordList = createFlatRecordsList(habitFromServer)

    runInAction(() => {
      this.habits.push(habitFromServer)
      this.flatHabitsWithFlatRecordsList[habitFromServer.id] = habitFromServerWithFlatRecordList
    })
  }

  updateHabit = async (habit: Pick<Habit, 'goal' | 'id' | 'name'>) => {
    const habitFromServer = await this.transportLayer.habitsService.habits.updateHabit(habit)

    runInAction(() => {
      this.habits = this.habits.map((item) => (item.id === habit.id ? habitFromServer : item))
    })
  }

  updateHabitRecord = async (record: HabitRecord) => {
    const recordFromServer =
      await this.transportLayer.habitsService.habits.updateHabitRecord(record)

    runInAction(() => {
      const records = this.habits.find((item) => item.id === record.habitId)?.records ?? []
      const habitsRecord = this.flatHabitsWithFlatRecordsList[record.habitId] ?? {}

      const recordIndex = records.findIndex((item) => item.id === record.id)
      if (recordIndex !== -1) {
        records[recordIndex] = recordFromServer
        habitsRecord[record.date] = recordFromServer
      }
    })

    this.updateHabitAchieved({ habitId: record.habitId, value: record.done })
  }

  updateHabitAchieved = ({ habitId, value }: { habitId: string; value: boolean }) => {
    const habitFromArray = this.habits.find((item) => item.id === habitId)

    runInAction(() => {
      if (habitFromArray) {
        habitFromArray.achieved = value ? habitFromArray.achieved + 1 : habitFromArray.achieved - 1
      }
    })
  }

  deleteHabit = async (id: string) => {
    await this.transportLayer.habitsService.habits.deleteHabit(id)

    runInAction(() => {
      this.habits = this.habits.filter((habit) => habit.id !== id)
      delete this.flatHabitsWithFlatRecordsList[id]
    })
  }
}
