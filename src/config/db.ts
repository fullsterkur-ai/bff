import mongoose from 'mongoose'

import { logger } from '../core/logger'

const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI?.trim()
  if (!MONGO_URI) throw new Error('MONGO_URI is not specified in .env')
  logger.info('Connecting to DB...')
  await mongoose.connect(MONGO_URI)
  logger.info('Connected to DB')
}

export default connectDB
