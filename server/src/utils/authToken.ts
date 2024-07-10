import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.path)
  if (['/signup', '/login', '/refresh'].includes(req.path)) {
    next()
    return
  }

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    res.status(401)
    return res.send({ message: 'jwt expired' })
  }

  verify(token, process.env.JWT_SECRET as string, (err: unknown) => {
    if (err) {
      return res.sendStatus(403)
    }
    next()
  })
}
