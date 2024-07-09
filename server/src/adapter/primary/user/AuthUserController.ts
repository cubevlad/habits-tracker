import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { AuthenticateUserPort } from '../../../application/User/port/primary/AuthenticateUserPort'
import { UserMapper } from '../../mappers/UserMapper'
import { UnCaughtError } from '../../../Errors/Uncaught'
import { IUserToUI } from '../../../application/User/domain/IUser'

@injectable()
export class AuthUserController {
  private userMapper: typeof UserMapper
  constructor(@inject('AuthenticateUserUseCase') private userCreate: AuthenticateUserPort) {
    this.userCreate = userCreate
    this.userMapper = UserMapper
  }
  async login(body: { email: string; password: string }): Promise<{ token: string }> {
    try {
      const token = await this.userCreate.login(body.email, body.password)
      return { token: token }
    } catch (error: unknown) {
      const err = error as { message: string; status: number }
      throw new UnCaughtError(err.message, err.status)
    }
  }
  async authenticate(token: string): Promise<IUserToUI> {
    try {
      const user = await this.userCreate.authenticate(token)
      return this.userMapper.toUI(user)
    } catch (error: unknown) {
      const err = error as { message: string; status: number }
      throw new UnCaughtError(err.message, err.status)
    }
  }
}
