function bootstrap(app) {
  const errors = require('@feathersjs/errors');
  const commonHooks = require('feathers-hooks-common');
  const feathersMongoose = require('feathers-mongoose');
  const logger = require('winston');

  const KeyAuthenticator = require('../../policies/key.authentication');
  const createModel = require('../../models/station.model');
  const StationHooks = require('./station.hooks');
  const StationService = require('./station.service.js');

  var Model = createModel(app);
  var hooks = new StationHooks(new KeyAuthenticator(app.get('appSecret')), commonHooks, errors);
  var service = new StationService(app, Model, hooks, feathersMongoose, logger);

  app.configure(service.start());
}

module.exports = {
  bootstrap: bootstrap
};