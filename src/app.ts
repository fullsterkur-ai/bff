import connectDB from './config/db'
import authService from './services/auth.service'
import userService from './services/user.service'
import startServer from './server'

const start = async (): Promise<void> => {
  authService.ensureJwtSecret()
  await connectDB()
  await userService.initializePopulation()
  await startServer()
}

void start()
