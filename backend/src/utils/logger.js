const { createLogger, format, transports } = require('winston');

const { combine, printf } = format;

const config = require('../config');

const appFormat = printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`);

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File(config.logger.fileAll),
    new transports.File(config.logger.fileError),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      format.timestamp(),
      appFormat,
    ),
  }));
}

module.exports = logger;
