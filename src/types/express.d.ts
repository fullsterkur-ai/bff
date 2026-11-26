import type { UserRole } from '../models/user'
import type { Request } from 'express'

export interface AuthUser {
  id: string
  name: string
  email: string
  roles: UserRole[]
}

export type TypedRequest<B = unknown, P = unknown, Q = unknown> = Request<P, unknown, B, Q>

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
