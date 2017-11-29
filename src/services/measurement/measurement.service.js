// Initializes the `measurement` service on path `/measurement`
const createService = require('feathers-mongoose');
const createModel = require('../../models/measurement.model');
const hooks = require('./measurement.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'measurement',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/measurement', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('measurement');

  service.hooks(hooks(app));
};
