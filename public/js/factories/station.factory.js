(function () {
  'use strict';

  angular.module('app.factories')
    .factory('stationFactory', createFactory);

    createFactory.$inject = ['$q', 'StationApiClient', 'MeasurementApiClient'];
    function createFactory($q, StationApiClient, MeasurementApiClient) {
      class Station {
        constructor(id, localId, displayName, channelDisplayNames) {
          this._id = id;
          this.localId = localId;
          this.displayName = displayName || localId;
          this.channelDisplayNames = channelDisplayNames;
          this.measurements = {};
        }

        update() {
          return StationApiClient.update(this).$promise;
        }

        getMeasurementsForStation() {
          var ret = MeasurementApiClient.query({ station: this._id }).$promise;

          var that = this;
          ret.then(function (res) {
            that.measurements = {};
            res.data.forEach((m) => {
              if (!that.measurements[m.channelIndex]) {
                that.measurements[m.channelIndex] = [];
              }

              that.measurements[m.channelIndex].push(m);
            });
          });

          return ret;
        }
      }

      function build(obj = {}) {
        return new Station(obj._id, obj.localId, obj.displayName, obj.channelDisplayNames);
      }

      function query() {
        return $q((resolve, reject) => {
          return StationApiClient.query().$promise
            .then((res) => {
              return resolve(res.data.map((s) => build(s)));
            })
            .catch(reject);
        });
      }

      return { build, query };
    }
}());
