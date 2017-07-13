/* global angular */

(function () {
  'use strict';

  /**
   * @example <input type="text" check-strength />
   */
  angular
      .module('copayApp.directives')
      .directive('checkStrength', checkStrength);

  checkStrength.$inject = [];

  function checkStrength() {
    return {
      replace: false,
      restrict: 'EACM',
      require: 'ngModel',
      link(scope, element, attrs) {
        const MIN_LENGTH = 8;
        const MESSAGES = ['Very Weak', 'Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        const COLOR = ['#dd514c', '#dd514c', '#faa732', '#faa732', '#16A085', '#16A085'];

        function evaluateMeter(password) {
          let passwordStrength = 0;
          let text;
          if (password.length > 0) passwordStrength = 1;
          if (password.length >= MIN_LENGTH) {
            if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) {
              passwordStrength++;
            } else {
              text = ', add mixed case';
            }
            if (password.match(/\d+/)) {
              passwordStrength++;
            } else if (!text) text = ', add numerals';
            if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
              passwordStrength++;
            } else if (!text) text = ', add punctuation';
            if (password.length > 12) {
              passwordStrength++;
            } else if (!text) text = ', add characters';
          } else {
            text = ', that\'s short';
          }
          if (!text) text = '';

          return {
            strength: passwordStrength,
            message: MESSAGES[passwordStrength] + text,
            color: COLOR[passwordStrength],
          };
        }

        scope.$watch(attrs.ngModel, (newValue, oldValue) => {
          if (newValue && newValue !== '') {
            const info = evaluateMeter(newValue);
            scope[attrs.checkStrength] = info;
          }
        });
      },
    };
  }

})();