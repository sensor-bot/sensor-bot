function bootstrap(app) {
  const errors = require('@feathersjs/errors');
  const commonHooks = require('feathers-hooks-common');
  const feathersMongoose = require('feathers-mongoose');
  const logger = require('winston');

  const KeyAuthenticator = require('../../policies/key.authentication');
  const createModel = require('../../models/measurement.model');
  const MeasurementHooks = require('./measurement.hooks');
  const MeasurementService = require('./measurement.service.js');

  var Model = createModel(app);
  var hooks = new MeasurementHooks(new KeyAuthenticator(app.get('appSecret')), commonHooks, errors);
  var service = new MeasurementService(app, Model, hooks, feathersMongoose, logger);

  app.configure(service.start());
}

module.exports = {
  bootstrap: bootstrap
};