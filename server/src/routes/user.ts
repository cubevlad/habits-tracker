import { Request, Response, Router } from 'express'
import { describeBodyErrorMessage } from '../utils/describeBodyErrorMessage'
import { randomUUID } from 'crypto'
import { verify } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import prismaClient from '../database/db'
import { User } from '@prisma/client'
import { tokenService } from '../services/token-service'
import { TypedRequestBody } from '../typings/global'

const router = Router()
/**
 * Current user
 */
router.get('/current', async (req: Request, res: Response) => {
  const token = tokenService.getUserData(req)

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: { name: token.name },
    })

    if (!user) {
      res.status(404)
      res.send({ message: 'No users found' })
      return
    }

    res.status(200)
    res.send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    })
  } else {
    res.status(500)
    res.send({ message: 'Something went wrown' })
  }

  return
})

/**
 * Login route
 */
router.post('/signin', async (req: TypedRequestBody<User>, res: Response) => {
  // validate fields
  const errors = describeBodyErrorMessage<User>(req.body, ['name', 'password'])
  if (errors.isError) {
    res.status(500)
    res.send({ ...errors.fields })
  }
  // check if user exist
  const currentUser = await prismaClient.user.findFirst({
    where: { name: req.body.name },
  })
  if (!currentUser) {
    res.status(404)
    res.send({ message: 'No users found' })
    return
  }
  // verify passwors
  const isPassValid = await compare(req.body.password, currentUser.password)
  if (!isPassValid) {
    res.status(500)
    res.send({ message: 'Password is not correct' })
    return
  }
  // create access token
  const { accessToken, refreshToken } = tokenService.generateTokens(req.body.name, req.body.id)
  await tokenService.saveToken(currentUser.id, refreshToken)
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.json({ accessToken, refreshToken })
})

/**
 * Registration route
 */
router.post('/signup', async (req: TypedRequestBody<User>, res: Response) => {
  const errors = describeBodyErrorMessage<User>(req.body, ['name', 'password', 'email'])
  if (errors.isError) {
    res.status(500)
    res.send({ ...errors.fields })
    return
  }
  // check usename - if exist -> return
  const foundedUser = await prismaClient.user.findFirst({
    where: { name: req.body.name },
  })
  if (foundedUser) {
    res.status(500)
    res.send('User with this nickname is already exist')
    return
  }
  // encrypt pass
  const pass = await hash(req.body.password, 10)
  // create new user
  const userId = randomUUID()
  await prismaClient.user.create({
    data: {
      email: req.body.email,
      createdAt: new Date(Date.now()),
      role: 'USER',
      id: userId,
      name: req.body.name,
      password: pass,
    },
  })
  // create token using username
  const { accessToken, refreshToken } = tokenService.generateTokens(req.body.name, req.body.id)
  await tokenService.saveToken(userId, refreshToken)
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  })
  return res.json({ accessToken, refreshToken })
})

/**
 * Logout route
 */
router.post('/logout', async (req: Request, res: Response) => {
  const token = tokenService.getUserData(req)
  if (token && token.userId) {
    const { userId } = token
    await tokenService.removeToken(userId)
  }
  return res.status(200)
})

// @TODO: move to token-service
/**
 * Validate access token Refresh token
 */
router.get('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  // validate token
  const is_valid = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string)
  if (!is_valid) return
  // find current user
  const user_data = tokenService.getUserData(req)
  if (user_data) {
    const { name, userId } = user_data
    // find token within db
    const db_token = await tokenService.findToken(userId)
    if (db_token) {
      const { accessToken, refreshToken } = tokenService.generateTokens(name, userId)
      await tokenService.saveToken(userId, refreshToken)
      res.status(200)
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      })
      return res.send({ accessToken, refreshToken })
    }
  }
})

export default router
