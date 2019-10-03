/* eslint import/no-dynamic-require: 0 global-require: 0 */
const appRoot = require('app-root-path');

const configuration = () => {
  // Set default node environment to development
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const defaultConfig = {
    logger: {
      fileAll: {
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      fileError: {
        level: 'error',
        filename: `${appRoot}/logs/app_error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      colors: {
        emerg: 'bold underline white redBG',
        alert: 'black yellowBG',
        crit: 'italic white magentaBG',
        error: 'red',
        warning: 'yellow',
        notice: 'cyan',
        info: 'green',
        debug: 'magenta',
      },
    },
  };

  // Load configuration
  const config = require(`./env/${process.env.NODE_ENV}`) || {};

  if (!config.logger) Object.assign(config, defaultConfig);
  return config;
};

module.exports = configuration();
