const MongooseService = require('../mongoose.service');

class MeasurementService extends MongooseService {
  constructor(app, Model, hooks, feathersMongoose, logger) {
    var options = {
      name: 'measurement',
      Model,
      paginate: app.get('paginate')
    };

    super(options, hooks, feathersMongoose, logger);
  }
}

module.exports = MeasurementService;
