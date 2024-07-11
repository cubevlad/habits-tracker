import { Router } from 'express'

import userRouter from './user'
import notesRoutes from './notes'

const router = Router()

router.use('/api/v1/user', userRouter)
router.use('/api/v1/notes', notesRoutes)

export default router
