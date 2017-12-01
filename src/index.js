/* eslint-disable no-console */
const Logger = require('./utils/logger');
const ConfigValidator = require('./utils/config.validator.js');
global.logger = new Logger('debug');

var configValidator = new ConfigValidator();
configValidator.checkEnv();

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => {
  global.logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', () => {
  global.logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
});
