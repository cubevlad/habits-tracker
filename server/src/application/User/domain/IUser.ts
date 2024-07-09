export type UserId = string
export type UserName = string
export type UserEmail = string
export type UserPassword = string
export type UserCreatedAt = string

export interface IUser {
  id?: UserId
  name: UserName
  email: UserEmail
  password: UserPassword
  created_at: UserCreatedAt
}

export interface IUserCreate {
  name: UserName
  email: UserEmail
  password: UserPassword
}

export interface IUserToUI {
  id: UserId
  name: UserName
  email: UserEmail
  created_at: UserCreatedAt
}
