(function () {
  'use strict';

  angular.module('app.services')
    .service('MeasurementApiClient', MeasurementApiClient);

    MeasurementApiClient.$inject = ['$resource'];

    function MeasurementApiClient($resource) {
      return $resource('/measurement', {}, {});
    }
}());
