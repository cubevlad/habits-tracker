import { Router, Request, Response } from 'express'
import { tokenService } from '../services/token-service'
import prismaClient from '../database/db'
import { createHabitRecords } from '../utils/createHabitRecords'
import { getFirstAndLastDayOfMonth } from '../utils/getFirstAndLastDayOfMonth'

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
      startedAt: {
        lte,
      },
    },
    include: {
      records: {
        where: {
          date: {
            gte,
            lte,
          },
        },
        orderBy: {
          date: 'asc',
        },
      },
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

  const { goal, name, startedAt: bodyStartedAt } = req.body
  const startedAt = bodyStartedAt ? new Date(bodyStartedAt) : new Date(Date.now())
  const records = createHabitRecords(startedAt)

  const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(startedAt)

  const gte = new Date(firstDayOfMonth)
  gte.setHours(0, 0, 0, 0)

  const lte = new Date(lastDayOfMonth)
  lte.setHours(23, 59, 59, 999)

  const habit = await prismaClient.habit.create({
    data: {
      goal: Number(goal),
      name,
      userId: user.id,
      startedAt,
      records: {
        createMany: {
          data: records,
        },
      },
    },
    include: {
      records: {
        where: {
          date: {
            gte,
            lte,
          },
        },
      },
    },
  })

  res.send(habit)
})

router.put('/update/:id', async (req: Request, res: Response) => {
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
  const { id } = req.params
  const { goal, name } = req.body

  const startedAt = new Date(Date.now())
  const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(startedAt)

  const gte = new Date(firstDayOfMonth)
  gte.setHours(0, 0, 0, 0)

  const lte = new Date(lastDayOfMonth)
  lte.setHours(23, 59, 59, 999)

  const habit = await prismaClient.habit.update({
    where: {
      id: id,
      userId,
    },
    data: {
      goal: Number(goal),
      name,
    },
    include: {
      records: {
        where: {
          date: {
            gte,
            lte,
          },
        },
      },
    },
  })

  res.send(habit)
})

router.put('/update/:id/record', async (req: Request, res: Response) => {
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

  const { id: habitId } = req.params
  const { id, done } = req.body

  const habit = await prismaClient.habit.findFirst({
    where: {
      id: habitId,
      userId: user.id,
    },
  })

  if (!habit) {
    res.status(404)
    res.send({ message: 'No habits found' })
    return
  }

  const record = await prismaClient.record.findFirst({
    where: {
      habitId: habit.id,
      id,
    },
  })

  if (!record) {
    res.status(404)
    res.send({ message: 'No records found' })
    return
  }

  const updatedRecord = await prismaClient.record.update({
    where: {
      id,
    },
    data: {
      done,
    },
  })

  res.send(updatedRecord)
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
