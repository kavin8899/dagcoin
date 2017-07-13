/* global angular */

(function () {
  'use strict';

  /**
   * @example <input type="text" highlight-on-change />
   */
  angular
      .module('copayApp.directives')
      .directive('highlightOnChange', highlightOnChange);

  highlightOnChange.$inject = [];

  function highlightOnChange() {
    return {
      restrict: 'A',
      link(scope, element, attrs) {
        scope.$watch(attrs.highlightOnChange, () => {
          element.addClass('highlight');
          setTimeout(() => {
            element.removeClass('highlight');
          }, 500);
        });
      },
    };
  }

})();