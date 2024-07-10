import { JwtPayload } from 'jsonwebtoken'

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedJwtPayload extends JwtPayload {
  name: string
  userId: string
  iat: number
  exp: number
}
