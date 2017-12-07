var ServiceHooks = require('../service.hooks');

class StationHooks extends ServiceHooks {
  constructor(stationController, authenticator, commonErrors, commonHooks) {
    super(authenticator, commonErrors, commonHooks);

    // Authenticate for create and update methods
    this._authenticator.addMethodsToAuthenticate(['update']);

    // Disable methods
    this.hooks.before.create.push(this._commonHooks.disallow('external'));
    this.hooks.before.patch.push(this._commonHooks.disallow('external'));

    this.hooks.before.update.push(stationController.addCleanUpdateHook());
  }
}

module.exports = StationHooks;
