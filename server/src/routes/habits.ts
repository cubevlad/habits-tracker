import { Router, Request, Response } from 'express'
import { tokenService } from '../services/token-service'
import prismaClient from '../database/db'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const token = tokenService.getUserData(req)

  if (!token) {
    res.status(401)
    res.send({ message: 'Unauthorized' })
    return
  }

  const user = await prismaClient.user.findFirst({
    where: { name: token.name },
  })

  if (!user) {
    res.status(404)
    res.send({ message: 'No users found' })
    return
  }

  const { id } = user

  const habits = await prismaClient.habit.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      startedAt: 'desc',
    },
  })

  res.send(habits)
})

router.post('/create', async (req: Request, res: Response) => {
  const token = tokenService.getUserData(req)

  if (!token) {
    res.status(401)
    res.send({ message: 'Unauthorized' })
    return
  }

  const user = await prismaClient.user.findFirst({
    where: { name: token.name },
  })

  if (!user) {
    res.status(404)
    res.send({ message: 'No users found' })
    return
  }

  const { goal, name } = req.params

  const habit = await prismaClient.habit.create({
    data: {
      goal: Number(goal),
      name,
      userId: user.id,
      startedAt: new Date(Date.now()),
    },
  })

  res.send(habit)
})

router.put('/update', async (req: Request<{ goal: string; name: string }>, res: Response) => {
  const token = tokenService.getUserData(req)

  if (!token) {
    res.status(401)
    res.send({ message: 'Unauthorized' })
    return
  }

  const user = await prismaClient.user.findFirst({
    where: { name: token.name },
  })

  if (!user) {
    res.status(404)
    res.send({ message: 'No users found' })
    return
  }

  const { id: userId } = user
  const { id, goal, name } = req.body

  const habit = await prismaClient.habit.update({
    where: {
      id,
      userId
    },
    data: {
      goal: Number(goal),
      name
    },
  })

  res.send(habit)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const token = tokenService.getUserData(req)

  if (!token) {
    res.status(401)
    res.send({ message: 'Unauthorized' })
    return
  }

  const user = await prismaClient.user.findFirst({
    where: { name: token.name },
  })

  if (!user) {
    res.status(404)
    res.send({ message: 'No users found' })
    return
  }

  const { id } = req.params

  const habit = await prismaClient.habit.findFirst({
    where: {
      userId: user.id,
    },
  })

  if (!habit) {
    res.status(404)
    res.send({ message: 'No habits found' })
    return
  }

  await prismaClient.habit.delete({
    where: {
      id,
    },
  })

  res.status(200)
  res.send('ok')
})

export default router
