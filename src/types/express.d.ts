import { UserRole } from '../models/user'

export interface AuthUser {
  id: string
  name: string
  email: string
  roles: UserRole[]
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
