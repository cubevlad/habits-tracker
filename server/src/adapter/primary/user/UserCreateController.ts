import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { CreateUserPort } from '../../../application/User/port/primary/CreateUserPort'
import { IUserToUI } from '../../../application/User/domain/IUser'
import { UserMapper } from '../../mappers/UserMapper'

@injectable()
export class UserCreateController {
  private userMapper: typeof UserMapper
  constructor(@inject('CreateUserUseCase') private userCreate: CreateUserPort) {
    this.userCreate = userCreate
    this.userMapper = UserMapper
  }
  async create(body: { name: string; password: string; email: string }): Promise<IUserToUI> {
    const date = new Date().toISOString()
    try {
      const userDTO = this.userMapper.toDomain({ ...body, created_at: date })

      const user = await this.userCreate.create({
        name: userDTO.name,
        password: userDTO.password,
        email: userDTO.email,
      })

      return user
    } catch (error) {
      throw error
    }
  }
}
