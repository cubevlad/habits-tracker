import { Router, Request, Response } from 'express'
import { tokenService } from '../services/token-service'
import prismaClient from '../database/db'

const router = Router()

router.get('/', async (req: Request<{ start_date: string; end_date: string }>, res: Response) => {
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

  const gte = new Date(start_date as string)
  gte.setHours(0, 0, 0, 0)

  const lte = new Date(end_date as string)
  lte.setHours(23, 59, 59, 999)

  const notes = await prismaClient.note.findMany({
    where: {
      userId: id,
      createdAt: {
        gte,
        lte,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  res.send(notes)
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

  const { id } = user
  const { content, createdAt: bodyDate } = req.body
  const createdAt = bodyDate ? new Date(bodyDate) : new Date(Date.now())

  const note = await prismaClient.note.create({
    data: {
      content: content,
      userId: id,
      createdAt,
    },
  })

  res.send(note)
})

router.put('/update', async (req: Request, res: Response) => {
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
  const { content, id: noteId } = req.body

  const note = await prismaClient.note.update({
    where: {
      id: noteId,
      userId: id,
    },
    data: {
      content: content,
      modifiedAt: new Date(Date.now()),
    },
  })

  res.send(note)
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

  const note = await prismaClient.note.findFirst({
    where: {
      userId: user.id,
    },
  })

  if (!note) {
    res.status(404)
    res.send({ message: 'No notes found' })
    return
  }

  await prismaClient.note.delete({
    where: {
      id,
    },
  })

  res.status(200)
  res.send('ok')
})

export default router
