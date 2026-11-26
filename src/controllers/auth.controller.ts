import type { Request, Response, NextFunction } from 'express'
import createResponse from '../utils/createResponse'
import { StatusCodes } from 'http-status-codes'
import authService from '../services/auth.service'
import AppError from '../errors/AppError'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
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
