import type { AxiosInstance } from 'axios'

import type { Habit } from '@shared/types'

export class HabitsController {
  private readonly instance: AxiosInstance

  constructor(private readonly apiInstance: AxiosInstance) {
    this.instance = apiInstance
  }

  public getHabits = async () => {
    const { data } = await this.instance.get<Habit[]>('habits')

    return data
  }

  public createHabit = async (habit: Pick<Habit, 'goal' | 'name'>) => {
    const { data } = await this.instance.post<Habit>('habits/create', habit)

    return data
  }

  public updateHabit = async (habit: Pick<Habit, 'goal' | 'id' | 'name'>) => {
    const { data } = await this.instance.put<Habit>('habits/update', habit)

    return data
  }

  public deleteHabit = async (id: string) => {
    await this.instance.delete(`habits/${id}`)
  }
}
