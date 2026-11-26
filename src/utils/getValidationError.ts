import mongoose from 'mongoose'

export const getValidationError = (error: mongoose.Error.ValidationError): String => {
  const firstError = Object.values(error.errors)[0]
  return firstError.message
}
