import AppError from './AppError'

class NotImplementedError extends AppError {
  constructor(message?: string) {
    super(message ?? 'Not implemented')
  }
}

export default NotImplementedError
