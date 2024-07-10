export interface User {
  id: string
  createdAt: Date
  email: string
  name: string
  password: string
  role: Role
  todos: Todo[]
}

export interface Todo {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  author: User
  authorId: string
  completed: boolean
}

type Role = 'USER' | 'ADMIN'
