const MongooseService = require('../mongoose.service');

class StationService extends MongooseService {
  constructor(app, Model, hooks, feathersMongoose, logger) {
    var options = {
      name: 'station',
      Model,
      paginate: app.get('paginate')
    };

    super(options, hooks, feathersMongoose, logger);
  }
}

module.exports = StationService;
