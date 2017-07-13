/* global angular */

(function () {
  'use strict';

  /**
   * @example <div loading></div>
   */
  angular
      .module('copayApp.directives')
      .directive('loading', loading);

  loading.$inject = [];

  function loading() {
    return {
      restrict: 'A',
      link($scope, element, attr) {
        const a = element.html();
        const text = attr.loading;
        element.on('click', () => {
          element.html(`<i class="size-21 fi-bitcoin-circle icon-rotate spinner"></i> ${text}...`);
        });
        $scope.$watch('loading', (val) => {
          if (!val) {
            element.html(a);
          }
        });
      },
    };
  }

})();