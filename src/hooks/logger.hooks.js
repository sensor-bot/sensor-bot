// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.

module.exports = function () {
  return context => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the mssage (and logger) to your needs
    global.logger.debug(`${context.type} app.service('${context.path}').${context.method}()`);
    
    if(typeof context.toJSON === 'function') {
      global.logger.debug('Hook Context', JSON.stringify(context, null, '  '));
    }
    
    if (context.error) {
      global.logger.error(context.error);
    }
  };
};
