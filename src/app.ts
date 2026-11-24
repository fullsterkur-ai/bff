import 'dotenv/config'
import os from 'os'
import express, { Request, Response } from 'express'
import { logger, httpLogger } from './core/logger'
import connectDB from './config/db'

const app = express()

app.use(httpLogger)

app.get('/', (_req: Request, res: Response) => res.json(1))

const start = async (): Promise<void> => {
  const SERVER_PORT = process.env.SERVER_PORT

  await connectDB()

  logger.info('Starting server...')
  app.listen(SERVER_PORT, () => {
    const networkInterfaces = os.networkInterfaces()
    const address = networkInterfaces.wlo1?.[0]?.address
    logger.info('Server listening on')
    logger.info(`\tLocal:\thttp://127.0.0.1:${SERVER_PORT}`)
    if (address) logger.info(`\tIP:\thttp://${address}:${SERVER_PORT}`)
  })
}

start()
