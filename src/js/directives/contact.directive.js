/* global angular */

(function () {
  'use strict';

  /**
   * @example <contact></contact>
   */
  angular
      .module('copayApp.directives')
      .directive('contact', contact);

  contact.$inject = ['addressbookService'];

  function contact(addressbookService) {
    return {
      restrict: 'E',
      link(scope, element, attrs) {
        const addr = attrs.address;
        addressbookService.getLabel(addr, (label) => {
          if (label) {
            element.append(label);
          } else {
            element.append(addr);
          }
        });
      },
    };
  }

})();