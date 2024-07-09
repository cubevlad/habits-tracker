import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import { FindUserPort } from '../port/primary/FindUserPort'
import { UserRepositoryPort } from '../port/secondary/UserRepositoryPort'
import { NotFoundError } from '../../../Errors/NotFound'
import { UnCaughtError } from '../../../Errors/Uncaught'

@injectable()
export class FindUserUseCase implements FindUserPort {
  constructor(@inject('UserRepository') private userRepository: UserRepositoryPort) {
    this.userRepository = userRepository
  }
  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new NotFoundError('user not found')
      }
      return user
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new NotFoundError('user not found')
      }
      return user
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
}
