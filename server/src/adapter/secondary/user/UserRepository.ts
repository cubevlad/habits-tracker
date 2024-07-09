import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { UserRepositoryPort } from '../../../application/User/port/secondary/UserRepositoryPort'
import { IUser } from '../../../application/User/domain/IUser'
import { User } from '../../../application/User/domain/User'
import db from '../../../infrastructure/db/db'
import { PrismaClient } from '@prisma/client'
import { UnCaughtError } from '../../../Errors/Uncaught'

@injectable()
export class UserRepository implements UserRepositoryPort {
  private db: PrismaClient
  private model: typeof db.user
  constructor() {
    this.db = db
    this.model = this.db.user
  }

  async create(user: IUser) {
    try {
      const exists = await this.model.findUnique({ where: { email: user.email } })
      if (exists) {
        throw new UnCaughtError('user already exists', 400)
      }
      const newUser = await this.model.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          id: user.id,
        },
      })
      return new User(newUser.name, newUser.email, newUser.password, newUser.id)
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
  async findById(id: string) {
    try {
      const user = await this.model.findUnique({ where: { id: id } })
      if (user) {
        return new User(user.name, user.email, user.password, user.id)
      }
      return null
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
  async findByEmail(email: string) {
    try {
      const user = await this.model.findUnique({ where: { email: email } })
      if (user) {
        return new User(user.name, user.email, user.password, user.id)
      }
      return null
    } catch (error: unknown) {
      const err = error as { message: string }
      throw new UnCaughtError(err.message)
    }
  }
}
