/* global angular */

(function () {
  'use strict';

  /**
   * @example <match></match>
   */
  angular
      .module('copayApp.directives')
      .directive('match', match);

  match.$inject = [];

  function match() {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        match: '=',
      },
      link(scope, elem, attrs, ctrl) {
        scope.$watch(() => (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue, (currentValue) => {
          ctrl.$setValidity('match', currentValue);
        });
      },
    };
  }

})();