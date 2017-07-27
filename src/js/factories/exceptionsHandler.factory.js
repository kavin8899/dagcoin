/* global angular */

(() => {
  'use strict';

  const eventBus = require('byteballcore/event_bus.js');

  angular
      .module('asd.f')
      .factory('$exceptionHandler', $exceptionHandler);

  $exceptionHandler.$inject = ['$log'];
  function $exceptionHandler($log) {
    const factory = {
      myExceptionHandler,
    };

    return factory;

    function myExceptionHandler(exception, cause) {
      console.log('angular $exceptionHandler');
      $log.error(exception, cause);
      eventBus.emit('uncaught_error', `An exception occurred: ${exception}; cause: ${cause}`, exception);
    }
  }
})();
