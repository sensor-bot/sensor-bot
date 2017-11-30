const { Logger, transports, config } = require('winston');
const chalk = require('chalk');

class AppLogger extends Logger {
  constructor(logLevel = 'silly', category = undefined) {
    super({
      transports: [
        new (transports.Console)({
          level: logLevel,
          timestamp: () => { 
            return `[${chalk.grey(new Date())}]`; 
          },
          formatter: (args) => {
            var metaString = Object.keys(args.meta).length === 0 && args.meta.constructor === Object ?
              '' : JSON.stringify(args.meta);

            if (category) {
              return `${args.timestamp()} - [${chalk.grey(category)}] - ${config.colorize(args.level, args.message + metaString)}`;
            }

            return `${args.timestamp()} - ${config.colorize(args.level, args.message)}`;
          },
          colorize: true
        })
      ]
    });
  }
}

module.exports = AppLogger;
