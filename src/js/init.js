

angular.element(document).ready(() => {
  // Run copayApp after device is ready.
  const startAngular = function () {
    angular.bootstrap(document, ['copayApp']);
  };

    /*
  var handleBitcoinURI = function(url) {
    if (!url) return;
    if (url.indexOf('glidera') != -1) {
      url = '#/uri-glidera' + url.replace('bitcoin://glidera', '');
    }
    else {
      url = '#/uri-payment/' + url;
    }
    setTimeout(function() {
      window.location = url;
    }, 1000);
  };
  */

  /* Cordova specific Init */
  if (window.cordova !== undefined) {
    document.addEventListener('deviceready', () => {
        /*
      document.addEventListener('pause', function() {
        if (!window.ignoreMobilePause) {
          setTimeout(function() {
            window.location = '#/cordova/pause/';
          }, 100);
        }
        setTimeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
      }, false);

      document.addEventListener('resume', function() {
        if (!window.ignoreMobilePause) {
          setTimeout(function() {
            window.location = '#/cordova/resume/';
          }, 100);
        }
        setTimeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
      }, false);
        */

        /*
      // Back button event
      document.addEventListener('backbutton', function() {
        var loc = window.location;
        var isHome = loc.toString().match(/index\.html#\/$/) ? 'true' : '';
        if (!window.ignoreMobilePause) {
          window.location = '#/cordova/backbutton/'+isHome;
        }
        setTimeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
      }, false);
        */

      document.addEventListener('menubutton', () => {
        window.location = '#/preferences';
      }, false);

      setTimeout(() => {
        navigator.splashscreen.hide();
      }, 2000);

        /*
      window.plugins.webintent.getUri(handleBitcoinURI);
      window.plugins.webintent.onNewIntent(handleBitcoinURI);
      window.handleOpenURL = handleBitcoinURI;
        */

      window.plugins.touchid.isAvailable(
        (msg) => { window.touchidAvailable = true; }, // success handler: TouchID available
        (msg) => { window.touchidAvailable = false; }  // error handler: no TouchID available
      );

      startAngular();
    }, false);
  } else {
    /*
    try {
      window.handleOpenURL = handleBitcoinURI;
      window.plugins.webintent.getUri(handleBitcoinURI);
      window.plugins.webintent.onNewIntent(handleBitcoinURI);
    } catch (e) {}
    */
    startAngular();
  }
});
