import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import createResponse from '../utils/createResponse'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import userService from '../services/user.service'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers()
    return createResponse(res, StatusCodes.OK, { users })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return createResponse(res, StatusCodes.OK, {})
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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
