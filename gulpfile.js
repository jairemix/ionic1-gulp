const gulp = require('gulp'),
  chalk = require('chalk'),
  del = require('del'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber');

gulp.task('delete', () => {
  console.log(chalk.blue('running delete task'));
  del( ['www/*'] ).then( res => {
    console.log(chalk.blue(`Files deleted: ${res}`));
  });
});

gulp.task('style', () => {
  console.log(chalk.blue('running style task'));
  return gulp
    .src('css/style.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('www'));
});

gulp.task('script', () => {
  console.log(chalk.blue('running script task'));
  return gulp
    .src('script/script.js')
    .pipe(jshint())
    .pipe(plumber()) //prevent pipe from breaking when errors are thrown
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('www'));
});

//task that runs when typing in just gulp
gulp.task('default', ['delete', 'style', 'script', 'watch'], () => {
  console.log(chalk.blue('running default task after tasks in array'));
});

gulp.task('watch', () => {
  console.log(chalk.blue('running watch task'));
  gulp.watch('css/style.css', ['style']);
  gulp.watch('script/script.js', ['script']);
});
