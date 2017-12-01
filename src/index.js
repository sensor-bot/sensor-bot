/* eslint-disable no-console */

// Get our configuration
const app = require('./app');
app.sensorBotGetConfiguration();

// Create the global logger
const Logger = require('./utils/logger');
global.logger = new Logger(app.get('logLevel'));

// Validate Configs
const ConfigValidator = require('./utils/config.validator.js');
var configValidator = new ConfigValidator();
configValidator.checkEnv();

app.sensorBotSetupExpress();

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => {
  global.logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', () => {
  global.logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
});
