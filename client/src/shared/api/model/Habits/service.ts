import type { AxiosInstance } from 'axios'

import { HabitsController } from './controller'

export class HabitsService {
  habits: HabitsController

  constructor(private readonly apiInstance: AxiosInstance) {
    this.habits = new HabitsController(this.apiInstance)
  }
}
