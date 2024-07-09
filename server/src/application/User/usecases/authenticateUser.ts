import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import { FindUserPort } from '../port/primary/FindUserPort'
import { comparePassword } from '../../helpers/password_utility'
import { UnCaughtError } from '../../../Errors/Uncaught'
import { generateToken, verifyToken } from '../../helpers/jwt_utility'
import { AuthenticateUserPort } from '../port/primary/AuthenticateUserPort'
import { IUser } from '../domain/IUser'
import { NotFoundError } from '../../../Errors/NotFound'

@injectable()
export class AuthenticateUserUseCase implements AuthenticateUserPort {
  comparePassword: typeof comparePassword
  generateToken: typeof generateToken
  verifyToken: typeof verifyToken

  constructor(@inject('FindUserUseCase') private findUserUseCase: FindUserPort) {
    this.findUserUseCase = findUserUseCase
    this.comparePassword = comparePassword
    this.generateToken = generateToken
    this.verifyToken = verifyToken
  }
  async login(email: string, password: string) {
    try {
      const user = await this.findUserUseCase.findByEmail(email)
      if (!user) {
        throw new NotFoundError('user not found')
      }
      const isPasswordValid = await this.comparePassword(password, user.password)
      if (!isPasswordValid) {
        throw new UnCaughtError('Invalid provided email or password', 401)
      }
      const token = await this.generateToken({ id: user.id ? user.id : '' }) // tslint:disable-line: no-string-literal
      return token
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
  async authenticate(token: string): Promise<IUser> {
    try {
      const decoded = await this.verifyToken(token)
      const user = await this.findUserUseCase.findById((decoded.payload as { id: string }).id)
      if (!user) {
        throw new NotFoundError('user not found', 404)
      }
      return user
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
}
