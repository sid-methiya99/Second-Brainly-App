import express from 'express'
import { userRouter } from './user.js'
import { contentRouter } from './content.js'
import { brainRouter } from './brain.js'
export const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/content', contentRouter)
mainRouter.use('/brain', brainRouter)
