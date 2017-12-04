(function () {
  'use strict';

  angular.module('app.config')
    .config(function(NotificationProvider) {
      NotificationProvider.setOptions({
        positionX: 'right',
        positionY: 'bottom'
      });
    });
}());
