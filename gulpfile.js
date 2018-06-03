// GULP | npm i gulp -D
// ----------------------------------------------
const gulp = require('gulp');
// ----------------------------------------------

// Enabel or disabel development
// ----------------------------------------------
let isDev = false;

gulp.task('enableDev', () => (isDev = true));
// ----------------------------------------------

// BrowserSync task
// ----------------------------------------------
//  Task dependities:
//  npm i browser-sync -D
const browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
  browserSync.init({ server: ['./dist', './example'] });
});
// ----------------------------------------------

// JavaScript
// ----------------------------------------------
gulp.task('js', () => {
  // Task dependities
  // npm i gulp-sourcemaps gulp-plumber gulp-if-else gulp-babel babel-core babel-preset-env gulp-concat gulp-uglify -D
  const sourcemaps = require('gulp-sourcemaps');
  const plumber = require('gulp-plumber');
  const ifElse = require('gulp-if-else');

  const babel = require('gulp-babel');
  const babelCore = require('babel-core');
  const babelPresetEnv = require('babel-preset-env');

  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');

  gulp
    .src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(ifElse(isDev, () => sourcemaps.init()))
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('googleMapsCustomHtmlOverlay.min.js'))
    .pipe(ifElse(isDev, () => sourcemaps.write()))
    .pipe(ifElse(!isDev, () => uglify()))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// html task
// ----------------------------------------------
gulp.task('html', () => {
  // Task
  // npm i gulp-flatten -D
  const flatten = require('gulp-flatten');

  gulp
    .src('src/html/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('example'))
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

gulp.task('cleanDist', () => {
  // Task dependities
  // npm i del -D
  const del = require('del');
  del(['dist']);
});

gulp.task('cleanExample', () => {
  // Task dependities
  // npm i del -D
  const del = require('del');
  del(['example']);
});

gulp.task('default', () => {
  // Task dependities
  // npm i run-sequence gulp-if-else -D
  const runSequence = require('run-sequence');
  const ifElse = require('gulp-if-else');

  gulp.start('cleanDist');
  gulp.start('cleanExample');

  // Wait for cleanDist task
  setTimeout(() => {
    runSequence('html', 'js');
    // Run browserSync if develop mode is enabled
    ifElse(isDev, () => gulp.start('browserSync'));
  }, 1000);
});

gulp.task('watch', ['default'], () => {
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
});
