const errors = require('@feathersjs/errors');
const commonHooks = require('feathers-hooks-common');
const feathersMongoose = require('feathers-mongoose');

const KeyAuthenticator = require('../../policies/key.authentication');
const createModel = require('../../models/measurement.model');
const MeasurementController = require('./measurement.controller');
const MeasurementHooks = require('./measurement.hooks');

const MongooseService = require('../mongoose.service');

class MeasurementService extends MongooseService {
  constructor(app) {
    var Model = createModel(app);
    var hooks = new MeasurementHooks(
      new MeasurementController(app.service('station')),
      new KeyAuthenticator(app.get('appSecret')),
      commonHooks,
      errors
    );

    var options = {
      name: 'measurement',
      Model,
      paginate: app.get('paginate')
    };

    super(options, hooks, feathersMongoose);
  }
}

module.exports = MeasurementService;
