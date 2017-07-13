/* global angular */

(function () {
    'use strict';

    angular
        .module('copayApp.directives')
        .directive('validAmount', validAmount);

    validAmount.$inject = ['configService'];

    function validAmount(configService) {
        return {
          require: 'ngModel',
          link: (scope, element, attrs, ctrl) => {
            const val = (value) => {
              // console.log('-- scope', ctrl);
              /* if (scope.home && scope.home.bSendAll){
               console.log('-- send all');
               ctrl.$setValidity('validAmount', true);
               return value;
               }*/
              // console.log('-- amount');
              const constants = require('byteballcore/constants.js');
              const asset = attrs.validAmount;
              const settings = configService.getSync().wallet.settings;
              let unitValue = 1;
              let decimals = 0;
              if (asset === 'base') {
                unitValue = settings.unitValue;
                decimals = Number(settings.unitDecimals);
              }			else if (asset === constants.DAGCOIN_ASSET) {
                unitValue = settings.dagUnitValue;
                decimals = Number(settings.dagUnitDecimals);
              }

              const vNum = Number((value * unitValue).toFixed(0));

              if (typeof value === 'undefined' || value === 0) {
                ctrl.$pristine = true;
              }

              if (typeof vNum === 'number' && vNum > 0) {
                const sep_index = (`${value}`).indexOf('.');
                const str_value = (`${value}`).substring(sep_index + 1);
                if (sep_index > 0 && str_value.length > decimals) {
                  ctrl.$setValidity('validAmount', false);
                } else {
                  ctrl.$setValidity('validAmount', true);
                }
              } else {
                ctrl.$setValidity('validAmount', false);
              }
              return value;
            };
            ctrl.$parsers.unshift(val);
            ctrl.$formatters.unshift(val);
          },
        };
    }

})();