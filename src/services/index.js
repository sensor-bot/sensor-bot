const MeasurementService = require('./measurement/measurement.service');
const StationService = require('./station/station.service');
module.exports = function (app) {
  new StationService(app).start(app);
  new MeasurementService(app).start(app);
};
