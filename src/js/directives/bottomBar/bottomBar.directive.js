/* global angular */

(() => {
  'use strict';

  /**
   * @desc custome icon directive
   * @example <bottom-bar></bottom-bar>
   */
  angular
      .module('copayApp.directives')
      .directive('bottomBar', bottomBar);

  bottomBar.$inject = [];

  function bottomBar() {
    return {
      restrict: 'AE',
      scope: {},
      link: ($scope, element) => {

      },
    };
  }
})();
