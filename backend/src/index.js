const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./utils/logger');

const apiRouter = require('./router/api.router');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
  app.use(`/${config.API_BASE_ENDPOINT}`, apiRouter);
});
