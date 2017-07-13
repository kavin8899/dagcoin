/* global angular */

(function () {
  'use strict';

  /**
   * @desc logo directive
   * @example <logo></logo>
   */
  angular
      .module('copayApp.directives')
      .directive('logo', logo);

  logo.$inject = [];

  function logo() {
    return {
      restrict: 'E',
      scope: {
        width: '@',
        negative: '=',
      },
      controller($scope) {
        // $scope.logo_url = $scope.negative ? 'img/logo-negative.svg' : 'img/logo.svg';
        $scope.logo_url = $scope.negative ? 'img/icons/icon-white-32.png' : 'img/icons/icon-black-32.png';
      },
      replace: true,
      // template: '<img ng-src="{{ logo_url }}" alt="Byteball">'
      template: '<div><img ng-src="{{ logo_url }}" alt="Byteball"><br>Byteball</div>',
    };
  }

})();