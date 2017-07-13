/* global angular */

(function () {
  'use strict';

  /**
   * @example <menu-toggle></menu-toggle>
   */
  angular
      .module('copayApp.directives')
      .directive('menuToggle', menuToggle);

  menuToggle.$inject = [];

  function menuToggle() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/includes/menu-toggle.html',
    };
  }

})();