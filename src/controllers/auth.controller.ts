import { StatusCodes } from 'http-status-codes'

import AppError from '../errors/AppError'
import authService from '../services/auth.service'
import createResponse from '../utils/createResponse'

import type { TypedRequest } from '../types/express'
import type { NextFunction, Response } from 'express'

interface LoginBody {
  email: string
  password: string
}
export const login = async (
  req: TypedRequest<LoginBody>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email } = req.body
    const { password } = req.body
    if (!email || !password)
      return createResponse(res, StatusCodes.BAD_REQUEST, 'email and password is required')
    const token = await authService.login(email, password)
    return createResponse(res, StatusCodes.OK, { token, type: 'Bearer' })
  } catch (error) {
    if (error instanceof AppError)
      return createResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    next(error)
  }
}
