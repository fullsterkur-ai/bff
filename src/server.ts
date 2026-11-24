import 'dotenv/config'
import os from 'os'
import express, { NextFunction, Request, Response } from 'express'
import { logger, httpLogger } from './core/logger'
import createResponse from './utils/createResponse'

import userRouter from './routes/user.route'
import { StatusCodes } from 'http-status-codes'
import NotImplementedError from './errors/NotImplementedError'

const app = express()

app.use(httpLogger)

app.get('/', (_req: Request, res: Response) =>
  createResponse(res, StatusCodes.OK, 'BFF operational'),
)

app.use('/users', userRouter)

app.use((_req: Request, res: Response, _next: NextFunction) =>
  createResponse(res, StatusCodes.NOT_FOUND, 'Route not found'),
)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotImplementedError)
    return createResponse(res, StatusCodes.NOT_IMPLEMENTED, err.message)
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
