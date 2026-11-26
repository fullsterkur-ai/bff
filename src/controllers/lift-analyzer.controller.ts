import { Request, Response, NextFunction } from 'express'
import liftAnalyzerService from '../services/lift-analyzer.service'
import createResponse from '../utils/createResponse'
import { StatusCodes } from 'http-status-codes'

export const getLiftAnalyzer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const details = await liftAnalyzerService.getServiceDetails()
    const health = await liftAnalyzerService.getHealth()
    return createResponse(res, StatusCodes.OK, { ...details, ...health })
  } catch (error) {
    next(error)
  }
}
