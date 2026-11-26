import type { Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'

const createResponse = (
  response: Response,
  statusCode: number,
  body: string | number | boolean | object | null,
) => {
  const success = statusCode >= 200 && statusCode < 300
  const statusMessage = getReasonPhrase(statusCode)
  return response.status(statusCode).json({ success, statusMessage, body })
}

export default createResponse
