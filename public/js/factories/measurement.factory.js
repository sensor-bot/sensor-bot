(function () {
  'use strict';

  angular.module('app.factories')
    .factory('measurementFactory', createFactory);

    createFactory.$inject = ['MeasurementApiClient'];
    function createFactory(MeasurementApiClient) {
      class Measurement {
        constructor(id, value, channelIndex, createdAt) {
          this._id = id;
          this.value = value;
          this.channelIndex = channelIndex;
          this.createdAt = createdAt;
        }
      }

      function build(obj = {}) {
        return new Measurement(obj._id, obj.value, obj.channelIndex, obj.createdAt);
      }

      return { build };
    }
}());
