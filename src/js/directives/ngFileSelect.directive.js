/* global angular */

(function () {
  'use strict';

  angular
      .module('copayApp.directives')
      .directive('ngFileSelect', ngFileSelect);

  ngFileSelect.$inject = [];

  function ngFileSelect() {
    return {
      link($scope, el) {
        el.bind('change', (e) => {
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        });
      },
    };
  }

})();