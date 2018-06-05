const gulp = require('gulp');

// BrowserSync task
// ----------------------------------------------
const browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
  browserSync.init({ server: ['./test'] });
});
// ----------------------------------------------

// JavaScript
// ----------------------------------------------
gulp.task('js', () => {
  const sourcemaps = require('gulp-sourcemaps');
  const plumber = require('gulp-plumber');

  const babel = require('gulp-babel');
  const babelCore = require('babel-core');
  const babelPresetEnv = require('babel-preset-env');

  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');

  gulp
    .src('src/googleMapsHtmlOverlay.js')
    .pipe(plumber())
    .pipe(gulp.dest('test'))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('googleMapsHtmlOverlay.min.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// ----------------------------------------------

// ----------------------------------------------
// Main tasks
//
// Commands:
// 1. gulp build -> building files for production
// 2. gulp watch -> build and watch files for development
//
// ----------------------------------------------

gulp.task('default', () => {
  gulp.start('js');
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/**/*.js', ['js']);
});
