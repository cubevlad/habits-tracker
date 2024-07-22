import { Router } from 'express'

import userRouter from './user'
import notesRoutes from './notes'
import habitsRouter from './habits'

const router = Router()

router.use('/api/v1/user', userRouter)
router.use('/api/v1/notes', notesRoutes)
router.use('/api/v1/habits', habitsRouter)

export default router
