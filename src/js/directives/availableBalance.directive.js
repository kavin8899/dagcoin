/* global angular */

(function () {
  'use strict';

  /**
   * @example <available-balance></available-balance>
   */
  angular
      .module('copayApp.directives')
      .directive('availableBalance', availableBalance);

  availableBalance.$inject = [];

  function availableBalance() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/includes/available-balance.html',
    };
  }

})();
