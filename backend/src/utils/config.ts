import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || '3000'
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://admin:password123@mongo:27017/second-brainly?authSource=admin'
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key'
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

console.log('Config loaded:', { PORT, MONGO_URL: MONGO_URL.substring(0, 50) + '...', JWT_SECRET: JWT_SECRET.substring(0, 10) + '...', CORS_ORIGIN })
