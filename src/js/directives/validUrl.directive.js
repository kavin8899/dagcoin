/* global angular */

(function () {
    'use strict';

    angular
        .module('copayApp.directives')
        .directive('validUrl', validUrl);

    validUrl.$inject = [];

    function validUrl() {
        return {
          require: 'ngModel',
          link: (scope, elem, attrs, ctrl) => {
            const validator = (value) => {
              // Regular url
              if (/^https?:\/\//.test(value)) {
                ctrl.$setValidity('validUrl', true);
                return value;
              }
              ctrl.$setValidity('validUrl', false);
              return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
          },
        };
    }

})();