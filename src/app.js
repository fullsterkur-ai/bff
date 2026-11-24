require('dotenv').config()
const os = require('os')
const express = require('express')
const { logger, httpLogger } = require('./core/logger')

const app = express()

app.use(httpLogger)

app.get('/', (req, res) => res.json(1))

const start = async () => {
  const SERVER_PORT = process.env.SERVER_PORT

  logger.info('Starting server...')
  app.listen(SERVER_PORT, () => {
    let networkInterfaces = os.networkInterfaces()
    let address = networkInterfaces.wlo1 && networkInterfaces.wlo1[0].address
    logger.info('Server listening on')
    logger.info(`\tLocal:\thttp://127.0.0.1:${SERVER_PORT}`)
    address && logger.info(`\tIP:\thttp://${address}:${SERVER_PORT}`)
  })
}

start()