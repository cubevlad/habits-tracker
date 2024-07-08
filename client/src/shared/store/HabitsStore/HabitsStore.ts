import { action, makeObservable, observable } from 'mobx'

import type { Habit } from '@shared/types'

export class HabitsStore {
  habits: Habit[] = []

  constructor() {
    makeObservable(this, {
      habits: observable,

      saveHabits: action,
      updateHabit: action,
      removeHabit: action,
    })
  }

  saveHabits = (habits?: Habit[]) => {
    this.habits = habits ?? []
  }

  updateHabit = (newHabit: Habit) => {
    this.habits = this.habits.map((habit) => (newHabit.id === habit.id ? newHabit : habit))
  }

  removeHabit = (id: string) => {
    this.habits = this.habits.filter((habit) => habit.id !== id)
  }
}
