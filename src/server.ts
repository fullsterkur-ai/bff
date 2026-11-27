import cors from 'cors'
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import os from 'os'

import { httpLogger, logger } from './core/logger'
import NotImplementedError from './errors/NotImplementedError'
import authRouter from './routes/auth.route'
import liftAnalyzerRouter from './routes/lift-analyzer.route'
import userRouter from './routes/user.route'
import createResponse from './utils/createResponse'

import type { NextFunction, Request, Response } from 'express'

import 'dotenv/config'

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
  const { SERVER_PORT } = process.env
  if (!SERVER_PORT) throw new Error('SERVER_PORT is not defined')

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(SERVER_PORT, () => {
      const address = Object.values(os.networkInterfaces())
        .flat()
        .find((iface) => iface?.family === 'IPv4' && !iface.internal)?.address

      logger.info(`\tLocal:\thttp://127.0.0.1:${SERVER_PORT}`)
      if (address) logger.info(`\tIP:\thttp://${address}:${SERVER_PORT}`)
      resolve()
    })

    server.on('error', reject)
  })
}

export default start
