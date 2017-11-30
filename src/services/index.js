const stationBootstrapper = require('./station/station.bootstrapper');
const measurementBootstrapper = require('./measurement/measurement.bootstrapper');

module.exports = function (app) {
  stationBootstrapper.bootstrap(app);
  measurementBootstrapper.bootstrap(app);
};
