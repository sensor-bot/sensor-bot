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
          if (result.length > 0) {
            global.logger.debug(`Found existing station (${context.data.localStationId}) for measurement`);
            context.station = result[0];
            return resolve();
          }

          // Create the new station if one doesn't yet exist
          that._stationService.create({
            localId: context.data.localStationId
          }).then((station) => {
            global.logger.debug(`Created new station (${station.localId}) for measurement`);
            context.data.station = station;

            return resolve();
          }).catch(reject);
        }).catch(reject);
      });
    }
  }
}

module.exports = MeasurementController;
