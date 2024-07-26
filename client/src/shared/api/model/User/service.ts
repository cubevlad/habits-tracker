import type { AxiosInstance } from 'axios'

import { UserController } from './controller'

export class UserService {
  public user: UserController

  constructor(private readonly apiInstance: AxiosInstance) {
    this.user = new UserController(apiInstance)
  }
}
