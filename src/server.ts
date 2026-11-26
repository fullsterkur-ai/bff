import 'dotenv/config'
import os from 'os'
import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import { logger, httpLogger } from './core/logger'
import createResponse from './utils/createResponse'
import { StatusCodes } from 'http-status-codes'
import NotImplementedError from './errors/NotImplementedError'

import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import liftAnalyzerRouter from './routes/lift-analyzer.route'

const app = express()

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN ?? '').replace(/\s+/g, '').split(','),
  }),
)
app.use(httpLogger)
app.use(express.json())

app.get('/', (_req: Request, res: Response) =>
  createResponse(res, StatusCodes.OK, 'BFF operational'),
)

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/training/analyzer', liftAnalyzerRouter)

app.use((_req: Request, res: Response, _next: NextFunction) =>
  createResponse(res, StatusCodes.NOT_FOUND, 'Route not found'),
)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotImplementedError)
    return createResponse(res, StatusCodes.NOT_IMPLEMENTED, err.message)
  if (err instanceof SyntaxError) return createResponse(res, StatusCodes.BAD_REQUEST, err.message)
  logger.error(err.stack)
  createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error')
})

const start = async (): Promise<void> => {
  const SERVER_PORT = process.env.SERVER_PORT

  logger.info('Starting server...')
  app.listen(SERVER_PORT, () => {
    const networkInterfaces = os.networkInterfaces()
    const address = networkInterfaces.wlo1?.[0]?.address
    logger.info('Server listening on')
    logger.info(`\tLocal:\thttp://127.0.0.1:${SERVER_PORT}`)
    if (address) logger.info(`\tIP:\thttp://${address}:${SERVER_PORT}`)
  })
}

export default start
