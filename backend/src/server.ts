import express from 'express'
import cors from 'cors'
import { mainRouter } from './routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.MONGO_URL!
const PORT = process.env.PORT!

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)

const connectDB = async () => {
   try {
      await mongoose.connect(URL)
   } catch (error) {
      console.error(error)
      process.exit()
   }
}

await connectDB()

app.listen(PORT, () => {
   console.log('Listening at port ', PORT)
})
