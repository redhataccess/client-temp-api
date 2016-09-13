'use strict';

var istanbul = require('browserify-istanbul');
var debowerify = require('debowerify');
var babelify = require('babelify');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify', 'should'],

    // list of files / patterns to load in the browser
    files: [
        'bower_components/urijs/src/URI.js',
        'bower_components/sinonjs/sinon.js',
        'bower_components/bluebird/js/browser/bluebird.js',
        'bower_components/jasmine-sinon/lib/jasmine-sinon.js',
        'src/js/api_client_test/account_settings.js',
        'tests/js/account_settings_spec.js',
        'src/js/api_client_test/system.js',
        'tests/js/system_spec.js',
        'src/js/api_client_test/account.js',
        'tests/js/account_spec.js'
    ],

    browserify: {
        debug: true,
        transform: [
            ['babelify', {presets: ['es2015']}],
            debowerify,
            'bulkify',
            istanbul({
                ignore: ['**/node_modules/**', '**/test/**']
            })
        ]
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/js/api_client_test/account_settings.js': ['browserify'],
        'src/js/api_client_test/account.js': ['browserify'],
        'src/js/api_client_test/system.js': ['browserify'],
        'tests/js/*_spec.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    proxies: {
        '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS']
  })
}
