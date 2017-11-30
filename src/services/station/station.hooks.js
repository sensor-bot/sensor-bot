var ServiceHooks = require('../service.hooks');

class StationHooks extends ServiceHooks {
  constructor(authenticator, commonErrors, commonHooks) {
    super(authenticator, commonErrors, commonHooks);

    // Authenticate for create and update methods
    this._authenticator.addMethodsToAuthenticate(['create', 'update']);
  }
}

module.exports = StationHooks;
