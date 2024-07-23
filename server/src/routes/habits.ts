import { Router, Request, Response } from 'express'
import { tokenService } from '../services/token-service'
import prismaClient from '../database/db'
import { createHabitRecords } from '../utils/createHabitRecords'

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
  const { start_date, end_date } = req.query

  if (!start_date || !end_date) {
    res.status(400)
    res.send({ message: 'Missing start_date or end_date in query params' })
    return
  }

  const gte = new Date(start_date as string)
  gte.setHours(0, 0, 0, 0)

  const lte = new Date(end_date as string)
  lte.setHours(23, 59, 59, 999)

  const habits = await prismaClient.habit.findMany({
    where: {
      userId: id,
      records: {
        some: {
          date: {
            gte,
            lte
          }
        }
      }
    },
    include: {
      records: true,
    },
    orderBy: {
      startedAt: 'asc',
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

  const { goal, name } = req.body
  const startedAt =new Date(Date.now())
  const records = createHabitRecords(startedAt)

  const habit = await prismaClient.habit.create({
    data: {
      goal: Number(goal),
      name,
      userId: user.id,
      startedAt,
      records: {
        createMany: {
          data: records,
        }
      },
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
