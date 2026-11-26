import mongoose from 'mongoose'
import readline from 'readline/promises'

import { logger } from '../core/logger'
import NotImplementedError from '../errors/NotImplementedError'
import { User, UserRole } from '../models/user.model'

import authService from './auth.service'

const createUser = async (user: InstanceType<typeof User>): Promise<void> => {
  user.password = await authService.hashPassword(user.password)
  await user.save()
  logger.debug(`Created user`, { user })
}

const getUsers = async (): Promise<InstanceType<typeof User>[]> => {
  const users = await User.find<InstanceType<typeof User>>({}, { password: false })
  return users
}

const getUserById = async (
  id: mongoose.Types.ObjectId,
): Promise<InstanceType<typeof User> | null> => {
  const user = await User.findById<InstanceType<typeof User>>(id, { password: false })
  return user
}

const getUserByFilter = async (
  filter: Record<string, unknown>,
): Promise<InstanceType<typeof User> | null> => {
  const user = await User.findOne<InstanceType<typeof User>>(filter, { password: false })
  return user
}

const updateUserById = (_id: mongoose.Types.ObjectId): Promise<never> => {
  throw new NotImplementedError()
}

const updateUserByFilter = (_filter: Record<string, unknown>): Promise<never> => {
  throw new NotImplementedError()
}

const deleteUserById = (_id: mongoose.Types.ObjectId): Promise<never> => {
  throw new NotImplementedError()
}

const deleteUserByFilter = (_filter: Record<string, unknown>): Promise<never> => {
  throw new NotImplementedError()
}

const initializePopulation = async (): Promise<void> => {
  const userCount = await User.countDocuments()
  if (userCount > 0) return

  logger.warn('Database user population is empty')
  logger.info('It looks like you are running this for the first time')
  logger.info("Let's create an admin account")

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  let completed = false

  try {
    while (!completed) {
      try {
        const name = await rl.question('Username for admin account: ')
        const email = await rl.question('Email for admin account: ')
        const password = await rl.question('Password for admin account: ')

        await createUser(new User({ name, email, password, roles: [UserRole.ADMIN] }))
        logger.info(`Created first account with admin privileges for ${name}`)
        completed = true
      } catch (error) {
        if (error instanceof mongoose.MongooseError) {
          logger.error(error.message)
          continue
        }
        throw error
      }
    }
  } finally {
    rl.close()
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
