module.exports = function (grunt) {
  function getPlatform() {
    switch (process.platform) {
      case 'win32': return 'win64'; // change to 'win' for both 32 and 64
      case 'linux': return 'linux64';
      case 'darwin': return 'osx64';
      default: throw Error(`unknown platform ${process.platform}`);
    }
  }

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      version: {
        command: 'node ./util/version.js',
      },
      clear: {
        command: 'rm -Rf bower_components node_modules',
      },
      osx64: {
        command: '../byteballbuilds/build-osx.sh osx64',
      },
      osx32: {
        command: '../byteballbuilds/build-osx.sh osx32',
      },
    },
    watch: {
      options: {
        dateFormat(time) {
          grunt.log.writeln(`The watch finished in ${time}ms at ${(new Date()).toString()}`);
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      sass: {
        files: ['src/css/*.scss', 'src/css/icons.css'],
        tasks: ['sass', 'concat:css'],
      },
      main: {
        files: [
          'src/js/init.js',
          'src/js/app.js',
          'src/js/directives/*.js',
          'src/js/filters/*.js',
          'src/js/routes.js',
          'src/js/services/*.js',
          'src/js/models/*.js',
          'src/js/controllers/*.js',
        ],
        tasks: ['concat:js', 'karma:prod'],
      },
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'src/css/main.css': 'src/css/main.scss',
        },
      },
    },

    concat: {
      options: {
        sourceMap: false,
        sourceMapStyle: 'link', // embed, link, inline
      },
      angular: {
        src: [
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/qrcode-generator/js/qrcode.js',
          'bower_components/qrcode-decoder-js/lib/qrcode-decoder.js',
          'bower_components/moment/min/moment-with-locales.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-foundation/mm-foundation-tpls.js',
          'bower_components/angular-moment/angular-moment.js',
          'bower_components/ng-lodash/build/ng-lodash.js',
          'bower_components/angular-qrcode/angular-qrcode.js',
          'bower_components/angular-gettext/dist/angular-gettext.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-carousel/dist/angular-carousel.js',
          'bower_components/angular-ui-switch/angular-ui-switch.js',
          'bower_components/angular-elastic/elastic.js',
          'bower_components/ui-router-extras/release/ct-ui-router-extras.js',
        ],
        dest: 'public/angular.js',
      },
      js: {
        src: [
          'angular-bitcore-wallet-client/index.js',
          'src/js/app.js',
          'src/js/routes.js',
          'src/js/directives/*.js',
          'src/js/filters/*.js',
          'src/js/models/*.js',
          'src/js/services/*.js',
          'src/js/controllers/*.js',
          'src/js/version.js',
          'src/js/init.js',
          'src/js/live-reload.js',
        ],
        dest: 'public/dagcoin.js',
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'public/css/dagcoin.css',
      },
      foundation: {
        src: [
          'bower_components/angular/angular-csp.css',
          'bower_components/animate.css/animate.css',
          'bower_components/foundation/css/foundation.css',
          'bower_components/angular-ui-switch/angular-ui-switch.css',
          'bower_components/angular-carousel/dist/angular-carousel.css',
        ],
        dest: 'public/css/foundation.css',
      },
    },
    uglify: {
      options: {
        mangle: false,
      },
      prod: {
        files: {
          'public/dagcoin.js': ['public/dagcoin.js'],
          'public/angular.js': ['public/angular.js'],
        },
      },
    },
    nggettext_extract: {
      pot: {
        files: {
          'i18n/po/template.pot': [
            'public/index.html',
            'public/views/*.html',
            'public/views/**/*.html',
            'src/js/routes.js',
            'src/js/services/*.js',
            'src/js/controllers/*.js',
          ],
        },
      },
    },
    nggettext_compile: {
      all: {
        options: {
          format: 'json',
          module: 'copayApp',
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'i18n/po',
            dest: 'public/languages',
            src: ['*.po'],
            ext: '.json',
          },
        ],
      },
    },
    copy: {
      icons: {
        expand: true,
        flatten: true,
        src: 'bower_components/foundation-icon-fonts/foundation-icons.*',
        dest: 'public/icons/',
      },
      osx: {
        expand: true,
        flatten: true,
        options: { timestamp: true, mode: true },
        src: ['webkitbuilds/build-osx.sh', 'webkitbuilds/Background.png'],
        dest: '../byteballbuilds/',
      },
      linux: {
        options: { timestamp: true, mode: true },
        files: [
          { expand: true,
            cwd: './webkitbuilds/',
            src: ['dagcoin.desktop', '../public/img/icons/icon-white-outline.iconset/icon_256x256.png'],
            dest: '../byteballbuilds/DAGCOIN-TN/linux32/',
            flatten: true,
            filter: 'isFile',
            options: { timestamp: true, mode: true },
          },
          {
            expand: true,
            cwd: './webkitbuilds/',
            src: ['dagcoin.desktop', '../public/img/icons/icon-white-outline.iconset/icon_256x256.png'],
            dest: '../byteballbuilds/DAGCOIN-TN/linux64/',
            flatten: true,
            filter: 'isFile',
            options: { timestamp: true, mode: true },
          },
        ],
      },
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
      },
      prod: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
      },
    },
    coveralls: {
      options: {
        debug: false,
        coverageDir: 'coverage/report-lcov',
        dryRun: true,
        force: true,
        recursive: false,
      },
    },
    nwjs: {
      options: {
          // platforms: ['win','osx64','linux'],
          // platforms: ['osx64'],
        platforms: [getPlatform()],
        appName: 'DAGCOIN-TN',
        flavor: 'normal',
        buildDir: '../byteballbuilds',
        version: '0.14.7',
        zip: false,
        macIcns: './public/img/icons/icon-white-outline.icns',
        winIco: './public/img/icons/dagcoin.ico',
        exeIco: './public/img/icons/dagcoin.ico',
        macPlist: {
          CFBundleURLTypes: [{ CFBundleURLName: 'Dagcoin action', CFBundleURLSchemes: ['DAGCOIN-TN'] }],
          LSHasLocalizedDisplayName: 0,
          /* CFBundleIconFile: 'nw.icns',*/
        },
      },
      src: ['./package.json', './public/**/*', './angular-bitcore-wallet-client/**/*'],
    },
    compress: {
      linux32: {
        options: {
          archive: '../byteballbuilds/dagcoin-linux32.zip',
        },
        expand: true,
        cwd: '../byteballbuilds/DAGCOIN-TN/linux32/',
        src: ['**/*'],
        dest: 'dagcoin-linux32/',
      },
      linux64: {
        options: {
          archive: '../byteballbuilds/dagcoin-linux64.zip',
        },
        expand: true,
        cwd: '../byteballbuilds/DAGCOIN-TN/linux64/',
        src: ['**/*'],
        dest: 'dagcoin-linux64/',
      },
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015'],
      },
      src: {
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: ['**/*.js'],
            dest: 'build/src',
          },
        ],
      }
    },
    browserify: {
      dist: {
        options: {
          exclude: ['sqlite3', 'nw.gui', 'mysql', 'ws', 'regedit'],
        },
        src: 'public/dagcoin.js',
        dest: 'public/dagcoin.js',
      },
    },
    // .deb proved to be very slow to produce and install: lintian spends a lot of time verifying a .bin file
    debian_package: {
      linux64: {
        files: [
          {
            expand: true,
            cwd: '../byteballbuilds/dagcoin-test/linux64/',
            src: ['**/*'],
            dest: '/opt/dagcoin-test/' },
                //{expand: true, cwd: '../byteballbuilds/byteball-test/linux64', src: ['dagcoin.desktop'], dest: '/usr/share/applications/byteball-test.desktop'}
        ],
        options: {
          maintainer: {
            name: 'Dagcoin',
            email: 'byteball@byteball.org',
          },
          long_description: 'A wallet for decentralized value',
          target_architecture: 'amd64',
        },
      },
    },
    innosetup_compiler: {
      win64: {
        options: {
          gui: false,
          verbose: false,
        },
        script: 'webkitbuilds/setup-win64.iss',
      },
      win32: {
        options: {
          gui: false,
          verbose: false,
        },
        script: 'webkitbuilds/setup-win32.iss',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-gettext');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-compress');
  // grunt.loadNpmTasks('grunt-debian-package');
  grunt.loadNpmTasks('innosetup-compiler');

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('default', ['nggettext_compile', 'exec:version', 'sass', 'concat', 'copy:icons']);
  grunt.registerTask('cordova', ['default', 'browserify']);
  grunt.registerTask('cordova-prod', ['cordova', 'uglify']);
  // grunt.registerTask('prod', ['default', 'uglify']);
  grunt.registerTask('translate', ['nggettext_extract']);
  grunt.registerTask('test', ['karma:prod']);
  grunt.registerTask('test-coveralls', ['karma:prod', 'coveralls']);
  // grunt.registerTask('desktop', ['prod', 'nwjs', 'copy:linux', 'compress:linux32', 'compress:linux64', 'copy:osx', 'exec:osx32', 'exec:osx64']);
  grunt.registerTask('desktop', ['default', 'nwjs']);
  grunt.registerTask('dmg', ['copy:osx', 'exec:osx64']);
  grunt.registerTask('linux64', ['copy:linux', 'compress:linux64']);
  grunt.registerTask('linux32', ['copy:linux', 'compress:linux32']);
  grunt.registerTask('deb', ['debian_package:linux64']);
  grunt.registerTask('inno64', ['innosetup_compiler:win64']);
  grunt.registerTask('inno32', ['innosetup_compiler:win32']);
};
