import AppError from './AppError'

class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message ?? 'Not found')
  }
}

export default NotFoundError
