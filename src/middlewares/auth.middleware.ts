import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import createResponse from '../utils/createResponse'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { AuthUser } from '../types/express'
import { UserRole } from '../models/user.model'

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization)
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const [grantType, token] = authorization.split(' ')

  if (grantType !== 'Bearer' || !token)
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as AuthUser
    next()
  } catch (error) {
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  }
}

export const requireRoles = (roles: UserRole[], mode: 'all' | 'one' = 'all') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    const userRoles = req.user.roles ?? []
    if (userRoles.includes(UserRole.ADMIN)) return next()

    const authorized =
      mode === 'all'
        ? roles.every((role) => userRoles.includes(role))
        : roles.some((role) => userRoles.includes(role))

    if (!authorized) return createResponse(res, StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
    next()
  }
}

// utility function
export const adminProtected = (req: Request, res: Response, next: NextFunction) => {
  return requireRoles([UserRole.ADMIN])(req, res, next)
}
