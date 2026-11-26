import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { logger } from '../core/logger'
import AppError from '../errors/AppError'
import NotFoundError from '../errors/NotFoundError'
import UnauthorizedError from '../errors/UnauthorizedError'
import { User } from '../models/user.model'

dotenv.config()

const ensureJwtSecret = (): void => {
  if (!process.env.JWT_SECRET) {
    logger.error('JWT_SECRET is not present in .env')
    logger.info('Generate one with openssl rand -base64 32')
    throw new AppError('JWT_SECRET is not present in .env')
  }
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

const createToken = (user: InstanceType<typeof User>): string | void => {
  if (!process.env.JWT_SECRET) return ensureJwtSecret()
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, roles: user.roles },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  )
}

const login = async (email: string, password: string): Promise<string | void> => {
  const user = await User.findOne({ email })
  if (!user) throw new NotFoundError()
  if (!(await verifyPassword(password, user.password))) throw new UnauthorizedError()
  return createToken(user)
}

export default {
  ensureJwtSecret,
  hashPassword,
  verifyPassword,
  login,
}
