import connectDB from './config/db'
import startServer from './server'
import userService from './services/user.service'

const start = async (): Promise<void> => {
  await connectDB()
  await userService.initializePopulation()
  await startServer()
}

start()
