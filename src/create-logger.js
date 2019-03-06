const path = require('path')
const { createLogger, format, transports } = require('winston')

module.exports = logger

function logger (caller) {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.label({ label: path.basename(caller) }),
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(
        info =>
          `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      )
    ),
    transports: [new transports.Console()]
  })
}
