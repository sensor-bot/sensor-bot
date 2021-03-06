var ServiceHooks = require('../service.hooks');

class MeasurementHooks extends ServiceHooks {
  constructor(measurementController, authenticator, commonErrors, commonHooks) {
    super(authenticator, commonErrors, commonHooks);

    // Authenticate for only create method
    this._authenticator.addMethodsToAuthenticate(['create']);

    // Disable methods
    this.hooks.before.update.push(this._commonHooks.disallow('external'));
    this.hooks.before.patch.push(this._commonHooks.disallow('external'));
    this.hooks.before.remove.push(this._commonHooks.disallow('external'));

    // Set the station field before creating the measurement
    this.hooks.after.find.push(measurementController.addCreatedAtReverseSortHook());
    this.hooks.after.find.push(measurementController.addQueryLimitHook());
    this.hooks.before.create.push(measurementController.addSetStationHook());
  }
}

module.exports = MeasurementHooks;
