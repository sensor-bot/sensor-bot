(function () {
  'use strict';

  angular.module('app.directives', []);
  angular.module('app.config', ['ui-notification']);
  angular.module('app.services', ['ngResource']);
  angular.module('app.factories', ['app.services']);
  angular.module('app.controllers', ['ui-notification', 'chart.js', 'app.factories']);
  angular.module('app', ['app.directives', 'app.controllers', 'app.config']);
}());
