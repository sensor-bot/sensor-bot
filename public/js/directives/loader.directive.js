// © Copyright 2017 Rick Delhommer - All Rights Reserved.

(function () {
  'use strict';

  angular.module('app.directives')
    .directive('loader', loader);

  function loader() {
    var directive = {
      restrict: 'E',
      templateUrl: '/templates/loader.template.html'
    };

    return directive;
  }
}());
