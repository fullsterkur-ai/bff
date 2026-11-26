import { StatusCodes } from 'http-status-codes'

import liftAnalyzerService from '../services/lift-analyzer.service'
import createResponse from '../utils/createResponse'

import type { NextFunction, Request, Response } from 'express'

export const getLiftAnalyzer = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const details = await liftAnalyzerService.getServiceDetails()
    const health = await liftAnalyzerService.getHealth()
    return createResponse(res, StatusCodes.OK, { ...details, ...health })
  } catch (error) {
    next(error)
  }
}
