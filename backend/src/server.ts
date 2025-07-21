import express from 'express'
import cors from 'cors'
import { mainRouter } from './routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { MONGO_URL, PORT } from './utils/config'
import axios from 'axios'

dotenv.config()

const app = express()
const TOKEN = process.env.TWITTER
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)

const connectDB = async () => {
   try {
      await mongoose.connect(MONGO_URL)
   } catch (error) {
      console.error(error)
      process.exit()
   }
}

await connectDB()

app.listen(PORT, () => {
   console.log('Listening at port ', PORT)
})
