import express from 'express'
import { Users } from '../db/schema'
import { ResponseCode } from '../utils/utils'

export const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
   const username = req.body.username
   const password = req.body.password

   const checkUsername = await Users.findOne({
      username: username,
   })

   if (checkUsername) {
      return res.status(ResponseCode.Conflict).json({
         msg: 'Username already exists',
      })
   }

   try {
      const addUser = await Users.create({
         username,
         password,
      })

      res.status(200).json({
         msg: 'Hello User',
      })
   } catch (error) {
      console.error(error)
   }
})
userRouter.post('/signin', (req, res) => {})
