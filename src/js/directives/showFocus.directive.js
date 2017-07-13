/* global angular */

(function () {
    'use strict';

    angular
        .module('copayApp.directives')
        .directive('showFocus', showFocus);


    showFocus.$inject = ['$timeout'];

    function showFocus($timeout) {
        return (scope, element, attrs) => {
          scope.$watch(attrs.showFocus,
              (newValue) => {
                $timeout(() => {
                  newValue && element[0].focus();
                });
              }, true);
        };
    }

})();