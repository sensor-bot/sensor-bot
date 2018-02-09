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
        }).then((res) => {
          if (res.length > 0) {
            global.logger.debug(`Found existing station (${context.data.localStationId}) for measurement`);
            context.data.station = res[0];
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

  addCreatedAtReverseSortHook() {
    var that = this;

    return createdAtReverseSortHook;

    function createdAtReverseSortHook(ctx) {
      ctx.result.sort((a, b) => {
        return (a.createdAt < b.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0);
      });
    }
  }

  addQueryLimitHook() {
    var that = this;

    return queryLimitHook;

    function queryLimitHook(ctx) {
      global.logger.warn(ctx.result[0])
      global.logger.warn(ctx.result[ctx.result.length - 1])
      ctx.result = ctx.result.slice(0, 500);
    }
  }
}

module.exports = MeasurementController;
