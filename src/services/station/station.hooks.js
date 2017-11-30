var ServiceHooks = require('../service.hooks');

class StationHooks extends ServiceHooks {
  constructor(authenticator, commonErrors, commonHooks) {
    super(authenticator, commonErrors, commonHooks);

    // Authenticate for create and update methods
    this._authenticator.addMethodsToAuthenticate(['update']);

    // Disable unused methods
    this.hooks.before.create.push(this._commonHooks.disallow('external'));
    this.hooks.before.patch.push(this._commonHooks.disallow('external'));
  }
}

module.exports = StationHooks;
