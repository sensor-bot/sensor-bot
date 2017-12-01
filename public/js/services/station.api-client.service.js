(function () {
  'use strict';

  angular.module('app.services')
    .service('StationApiClient', StationApiClient);

    StationApiClient.$inject = ['$resource'];

    function StationApiClient($resource) {
      return $resource('/station/:stationId', {
        stationId: '@_id'
      }, {
        update: {
          method: 'PUT'
        },
        query: {
          method:'GET',
          isArray:false
        },
      });
    }
}());
