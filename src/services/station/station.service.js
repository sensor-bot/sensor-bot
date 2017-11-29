// Initializes the `station` service on path `/station`
const createService = require('feathers-mongoose');
const createModel = require('../../models/station.model');
const hooks = require('./station.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'station',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/station', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('station');

  service.hooks(hooks);
};
