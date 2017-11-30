class MeasurementController {
  constructor(stationService) {
    this._stationService = stationService;
  }

  addSetStationHook() {
    var that = this;

    return setStation;

    function setStation(context) {
      return new Promise((resolve, reject) => {
        that._stationService.find({ 
          query: {
            localId: context.data.localStationId
          }
        }).then((result) => {
          global.logger.debug('find result: ', result);
          if (result.data.length > 0) {
            global.logger.debug('Found station');
            context.data.station = result.data[0];
            return resolve();
          }

          global.logger.debug('Create new station');

          // Create the new station if one doesn't yet exist
          that._stationService.create({
            localId: context.data.localStationId
          }).then((station) => {
            global.logger.debug('Created Station: ', station._id, station.localId);
            context.data.station = station;

            return resolve();
          }).catch(reject);
        }).catch(reject);
      });
    }
  }
}

module.exports = MeasurementController;
