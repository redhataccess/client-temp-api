'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('unit', ['runTests'], () => {
    return gulp.src('./src/js/api_client_test')
                .pipe(clean());
});

gulp.task('runTests', ['buildForTests'], function () {

    // Nonsensical source to fall back to files listed in karma.conf.js,
    // see https://github.com/lazd/gulp-karma/issues/9
    return gulp.src('./thisdoesntexist')
        .pipe(karma({
            configFile: 'tests/karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});