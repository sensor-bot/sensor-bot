class MongooseService {
  constructor(options, hooks, feathersMongoose, logger) {
    this._options = options;
    this._hooks = hooks;
    this._feathersMongoose = feathersMongoose;
    this._logger = logger;
  }

  start(app) {
    var that = this;
    app.configure((app) => {
      // Initialize our service with any options it requires
      that._logger.info(`Started ${that._options.name} service`);
      app.use(`/${that._options.name}`, that._feathersMongoose(that._options));
    
      // Get our initialized service so that we can register hooks and filters
      const service = app.service(that._options.name);
      service.hooks(that._hooks.hooks);
    });
  }
}

module.exports = MongooseService;
