(function () {
  'use strict';

  angular.module('app.services', ['ngResource']);
  angular.module('app.factories', ['app.services']);
  angular.module('app.controllers', ['chart.js', 'app.factories']);
  angular.module('app', ['app.controllers']);
}());
