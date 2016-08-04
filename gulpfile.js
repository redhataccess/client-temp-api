const gulp   = require('gulp'),        // if you don't know this...GOOGLE.COM it's very useful
      babel  = require('gulp-babel'),  // transpiler for es6 javascript
      uglify = require('gulp-uglify'), // Make file into janky-space-saving code
      concat = require('gulp-concat'), // Make multiple files into one giant file
      rename = require('gulp-rename'), // Rename file
      iife   = require('gulp-iife'),   // Makes Concatenated file into a self-invoking function
      del    = require('del');         // Gulp del = delete files

gulp.task('babel', () => {
    return gulp.src(['src/js/*.js', 'src/js/api_client/*.js'])
        .pipe(concat('app.js', {
            newLine: '\n'
        }))
    	.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
});

// Might use to surround the app in self invoking function 
// that takes global window as argument.
// gulp.task('buildApiClient', ['babel'], () => {
//     return gulp.src('src/js/api_client/*.js')
//         .pipe(concat('tempApiClient.js', {
//             newLine: '\n'
//         }))
//         .pipe(iife({
//             useStrict: true,
//             trimCode: true,
//             prependSemicolon: false,
//             args: ["window"]
//         }))
//         .pipe(gulp.dest('src/js'))
// });

// gulp.task('build', ['buildApiClient'], () => {
//     return gulp.src(['src/js/imports.js', 'src/js/tempApiClient.js'])
//         .pipe(concat('app.js', {
//             newLine: '\n'
//         }))
        
// });