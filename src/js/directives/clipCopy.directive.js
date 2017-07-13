/* global angular */

(function () {
  'use strict';

  /**
   * @example <div clip-copy></div>
   */
  angular
      .module('copayApp.directives')
      .directive('clipCopy', clipCopy);

  clipCopy.$inject = [];

  function clipCopy() {
    return {
      restrict: 'A',
      scope: {
        clipCopy: '='
      },
      link: ($scope, elm) => {

        /** TODO:
         * This doesn't work (FIXME)
         */

        function selectText(element) {
          const doc = document;
          let range;
          if (doc.body.createTextRange) { // ms
            range = doc.body.createTextRange();
            range.moveToElementText(element);
            range.select();
          } else if (window.getSelection) {
            const selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        elm.attr('tooltip', 'Press Ctrl+C to Copy');
        elm.attr('tooltip-placement', 'top');

        elm.bind('click', () => {
          selectText(elm[0]);
        });

      }
    };
  }

})();