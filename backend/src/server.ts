import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { mainRouter } from './routes/index.js'
import { MONGO_URL, PORT, CORS_ORIGIN } from './utils/config.js'

dotenv.config()

const app = express()

// Configure CORS
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}))

app.use(express.json())
app.use('/api/v1', mainRouter)

const connectDB = async () => {
   try {
      console.log('Connecting to MongoDB...')
      await mongoose.connect(MONGO_URL)
      console.log('MongoDB connected successfully')
   } catch (error) {
      console.error('MongoDB connection error:', error)
      process.exit(1)
   }
}

const startServer = async () => {
   try {
      await connectDB()
      app.listen(PORT, () => {
         console.log('Server listening at port', PORT)
      })
   } catch (error) {
      console.error('Failed to start server:', error)
      process.exit(1)
   }
}

startServer()
