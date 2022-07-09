import winston from 'winston'

function buildProdLogger() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'warn.log', 
                                    level: 'warn' }),
      new winston.transports.File({ filename: 'error.log', 
                                    level: 'error' })
    ],
  })
  return logger
}

function buildDevLogger() {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'info' })],
  })
  return logger
}

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

export default logger