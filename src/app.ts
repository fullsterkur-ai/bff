import connectDB from './config/db'
import startServer from './server'
import authService from './services/auth.service'
import userService from './services/user.service'

const start = async (): Promise<void> => {
  authService.ensureJwtSecret()
  await connectDB()
  await userService.initializePopulation()
  await startServer()
}

start()
