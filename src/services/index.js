const station = require('./station/station.service.js');
const measurement = require('./measurement/measurement.service.js');
module.exports = function (app) {
  app.configure(station);
  app.configure(measurement);
};
