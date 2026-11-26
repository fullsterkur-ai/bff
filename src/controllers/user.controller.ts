import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import { User } from '../models/user.model'
import userService from '../services/user.service'
import createResponse from '../utils/createResponse'
import { getValidationError } from '../utils/getValidationError'

import type { TypedRequest } from '../types/express'
import type { NextFunction, Request, Response } from 'express'

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const users = await userService.getUsers()
    return createResponse(res, StatusCodes.OK, { users })
  } catch (error) {
    next(error)
  }
}

interface CreateUserBody {
  name: string
  email: string
  password: string
}

export const createUser = async (
  req: TypedRequest<CreateUserBody>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return createResponse(res, StatusCodes.BAD_REQUEST, 'name, email, and password are required')
    const user = await userService.createUser(new User({ name, email, password }))
    return createResponse(res, StatusCodes.OK, { user })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return createResponse(res, StatusCodes.BAD_REQUEST, getValidationError(error))
    next(error)
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.params.id.toString()
    if (!mongoose.isValidObjectId(id))
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid id')

    const user = await userService.getUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')

    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.user?.id.toString()
    const user = await userService.getUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')

    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.params.id.toString()
    if (!mongoose.isValidObjectId(id))
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid id')

    const user = await userService.updateUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')
    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.user?.id.toString()
    const user = await userService.updateUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')
    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.params.id.toString()
    if (!mongoose.isValidObjectId(id))
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid id')

    const user = await userService.deleteUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')
    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}

export const deleteMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const id = req.user?.id.toString()
    const user = await userService.deleteUserById(new mongoose.mongo.ObjectId(id))
    if (!user) return createResponse(res, StatusCodes.NOT_FOUND, 'User not found')
    return createResponse(res, StatusCodes.OK, user)
  } catch (error) {
    next(error)
  }
}
