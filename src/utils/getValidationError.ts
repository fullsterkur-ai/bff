import type mongoose from 'mongoose'

export const getValidationError = (error: mongoose.Error.ValidationError): string => {
  const firstError = Object.values(error.errors)[0]
  return firstError.message
}
