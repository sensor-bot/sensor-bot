class MongooseService {
  constructor(options, hooks, feathersMongoose) {
    this._options = options;
    this._hooks = hooks;
    this._feathersMongoose = feathersMongoose;
  }

  start(app) {
    var that = this;
    app.configure((app) => {
      // Initialize our service with any options it requires
      global.logger.verbose(`Started ${that._options.name} service`);
      app.use(`/${that._options.name}`, that._feathersMongoose(that._options));
    
      // Get our initialized service so that we can register hooks and filters
      const service = app.service(that._options.name);
      service.hooks(that._hooks.hooks);
    });
  }
}

module.exports = MongooseService;
