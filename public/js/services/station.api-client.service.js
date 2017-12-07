(function () {
  'use strict';

  angular.module('app.services')
    .service('StationApiClient', StationApiClient);

    StationApiClient.$inject = ['$resource', '$http'];

    function StationApiClient($resource, $http) {
      var Client = $resource('/station/:stationId', {
        stationId: '@_id'
      }, {
        updateImpl: {
          method: 'PUT'
        }
      });

      angular.extend(Client, {
        update: function (station, appKey) {
          if (appKey) {
            $http.defaults.headers.common['app-key']= appKey;
          }

          return this.updateImpl(station).$promise;
        }
      });

      return Client;
    }
}());
