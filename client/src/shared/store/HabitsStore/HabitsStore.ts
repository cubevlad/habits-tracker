import { makeAutoObservable, runInAction } from 'mobx'

import type { Api } from '@shared/api'
import { createFlatList } from '@shared/lib'
import type { Habit } from '@shared/types'

export class HabitsStore {
  private readonly transportLayer: Api

  habits: Habit[] = []

  flatHabitsList: Record<string, Habit> = {}

  constructor(api: Api) {
    this.transportLayer = api

    makeAutoObservable(this)
  }

  fetchHabits = async () => {
    const habits = await this.transportLayer.habitsService.habits.getHabits()

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

  deleteHabit = async (id: string) => {
    await this.transportLayer.habitsService.habits.deleteHabit(id)

    runInAction(() => {
      this.habits = this.habits.filter((habit) => habit.id !== id)
      delete this.flatHabitsList[id]
    })
  }
}
