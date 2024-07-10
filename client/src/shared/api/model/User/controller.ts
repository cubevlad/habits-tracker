import type { AxiosInstance } from 'axios'

import type { AccountMeta, SignInRequestBody, SignUpRequestBody, Token } from '@shared/types'

export class UserController {
  private readonly instance: AxiosInstance

  constructor(private readonly apiInstance: AxiosInstance) {
    this.instance = apiInstance
  }

  public current = async () => {
    const { data } = await this.instance.get<AccountMeta>('user/current')
    return data
  }

  public singIn = async (data: SignInRequestBody) => {
    const { data: response } = await this.instance.post<Token>('user/signin', data)
    return response
  }

  public signUp = async (data: SignUpRequestBody) => {
    const { data: response } = await this.instance.post<Token>('user/signup', data)
    return response
  }
}
