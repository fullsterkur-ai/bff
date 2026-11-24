import readline from 'readline/promises'
import { User, UserRole } from '../models/user.model'
import { logger } from '../core/logger'
import { hashPassword } from './auth.service'
import mongoose from 'mongoose'
import NotImplementedError from '../errors/NotImplementedError'

const createUser = async (user: InstanceType<typeof User>) => {
  user.password = await hashPassword(user.password)
  await User.insertOne(user)
  logger.debug(`Created user`, { user })
}

const getUsers = async () => {
  const users = await User.find({}, { password: false })
  return users
}

const getUserById = async (id: mongoose.Types.ObjectId) => {
  const user = await User.findById(id, { password: false })
  return user
}

const getUserByFilter = async (filter: object) => {
  const user = await User.findOne(filter, { password: false })
  return user
}

const updateUserById = async (id: mongoose.Types.ObjectId) => {
  throw new NotImplementedError()
}

const updateUserByFilter = async (filter: object) => {
  throw new NotImplementedError()
}

const deleteUserById = async (id: mongoose.Types.ObjectId) => {
  throw new NotImplementedError()
}

const deleteUserByFilter = async (filter: object) => {
  throw new NotImplementedError()
}

const initializePopulation = async () => {
  const userCount = await User.countDocuments()
  if (userCount > 0) return

  logger.warn('Database user population is empty')
  logger.info('It looks like you are running this for the first time')
  logger.info("Let's create an admin account")

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  let completed = false
  while (!completed) {
    try {
      const name = await rl.question('Username for admin account: ')
      const email = await rl.question('Email for admin account: ')
      const password = await rl.question('Password for admin account: ')

      await createUser(new User({ name, email, password, roles: [UserRole.ADMIN] }))
      logger.info(`Created first account with admin priviledges for ${name}`)
      completed = true
    } catch (error) {
      if (error instanceof mongoose.MongooseError) {
        logger.error(error.message)
        continue
      }
      throw error
    }
  }
}

export default {
  createUser,
  getUsers,
  getUserById,
  getUserByFilter,
  updateUserById,
  updateUserByFilter,
  deleteUserById,
  deleteUserByFilter,
  initializePopulation,
}
