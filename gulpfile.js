'use strict';

var gulp = require('gulp'); // Gulp Javascript Task Runner
var sass = require('gulp-sass'); // SCSS & SASS Compiler
var csslint = require('gulp-csslint'); // CSS Error message handling 
var autoprefixer = require('gulp-autoprefixer'); // CSS vender prefixes
var uglify = require('gulp-uglify'); // Commpress JS
var concat = require('gulp-concat'); // Combine Files

gulp.task('sass', function () {
  gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass-min', function () {
  gulp.src('./css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(csslint())
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./css'));
});

// Task to Minify JS
gulp.task('js-min', function() {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./js/'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

// Gulp Default Task
gulp.task('default', ['sass', 'js-min']);

gulp.task('min', function() {
  runSequence('sass-min', 'js-min');
});
