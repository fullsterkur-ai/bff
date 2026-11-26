import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { UserRole } from '../models/user.model'
import authService from '../services/auth.service'
import createResponse from '../utils/createResponse'

import type { AuthUser } from '../types/express'
import type { NextFunction, Request, RequestHandler, Response } from 'express'

export const protect = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers
  if (!authorization)
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const [grantType, token] = authorization.split(' ')

  if (grantType !== 'Bearer' || !token)
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  try {
    if (!process.env.JWT_SECRET) return authService.ensureJwtSecret()
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded as AuthUser
    next()
  } catch {
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  }
}

export const requireRoles = (roles: UserRole[], mode: 'all' | 'one' = 'all'): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
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
export const adminProtected: RequestHandler = (req, res, next): void => {
  void requireRoles([UserRole.ADMIN])(req, res, next)
}
