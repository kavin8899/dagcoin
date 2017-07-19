(function () {
  'use strict';

  angular.module('copayApp.controllers').controller('passwordController',
    function ($rootScope, $scope, $timeout, profileService, notification, go, gettext) {
      const self = this;

      let pass1;

      self.isVerification = false;

      document.getElementById('passwordInput').focus();

      self.close = function (cb) {
        return cb('No password given');
      };

      self.set = function (isSetup, cb) {
        self.error = false;

        if (isSetup && !self.isVerification) {
          document.getElementById('passwordInput').focus();
          self.isVerification = true;
          pass1 = self.password;
          self.password = null;
          $timeout(() => {
            $rootScope.$apply();
          });
          return;
        }
        if (isSetup) {
          if (pass1 !== self.password) {
            self.error = gettext('Passwords do not match');
            self.isVerification = false;
            self.password = null;
            pass1 = null;

            return;
          }
        }
        cb(null, self.password);
      };
    });
}());
