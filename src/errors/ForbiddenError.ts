import AppError from './AppError'

class ForbiddenError extends AppError {
  constructor(message?: string) {
    super(message ?? 'Forbidden')
  }
}

export default ForbiddenError
