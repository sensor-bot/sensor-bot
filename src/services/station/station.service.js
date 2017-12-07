const errors = require('@feathersjs/errors');
const commonHooks = require('feathers-hooks-common');
const feathersMongoose = require('feathers-mongoose');

const KeyAuthenticator = require('../../policies/key.authenticator');
const createModel = require('../../models/station.model');
const StationController = require('./station.controller');
const StationHooks = require('./station.hooks');

const MongooseService = require('../mongoose.service');

class StationService extends MongooseService {
  constructor(app) {
    var Model = createModel(app);
    var hooks = new StationHooks(
      new StationController(),
      new KeyAuthenticator(app.get('appSecret')),
      commonHooks,
      errors);

    var options = {
      name: 'station',
      Model
    };

    super(options, hooks, feathersMongoose);
  }
}

module.exports = StationService;
