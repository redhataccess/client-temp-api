const gulp      = require('gulp'),                 // if you don't know this...GOOGLE.COM it's very useful
      babel     = require('gulp-babel'),           // transpiler for es6 javascript
      uglify    = require('gulp-uglify'),          // Make file into janky-space-saving code
      concat    = require('gulp-concat'),          // Make multiple files into one giant file
      rename    = require('gulp-rename');          // Rename file
      fs        = require('fs');			       // modify files/directories
      merge     = require('merge-stream')();       // handles multiple gulp streams
      clean     = require('gulp-clean');	       // remove files/directories
      stripComs = require('gulp-strip-comments');  // removes comments

var dir = './src/js/api_client';

gulp.task('buildForTests', () => {
	var files = fs.readdirSync(dir);
	return files.forEach(function (file) {
		return gulp.src(['./src/js/imports.js', dir + '/' + file, './src/js/responseHandlers.js'])
					.pipe(concat(file, {
						newLine: '\n\n'
					}))
					.pipe(stripComs())
					// .pipe(babel({
			  //       	presets: ['es2015'],
			  //       	comments: false
			  //       }))
					.pipe(gulp.dest('./src/js/api_client_test'));
	});
});