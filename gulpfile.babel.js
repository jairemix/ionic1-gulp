/** works with babel-core and babel-rc **/

import gulp from 'gulp';
import chalk from 'chalk';
import del from 'del';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import jshint from 'gulp-jshint';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import typescript from 'gulp-typescript';
import requireDir from 'require-dir';

/** without babel-core and babel-rc **/

// const gulp = require('gulp'),
//   chalk = require('chalk'),
//   del = require('del'),
//   cleanCSS = require('gulp-clean-css'),
//   uglify = require('gulp-uglify'),
//   rename = require('gulp-rename'),
//   jshint = require('gulp-jshint'),
//   plumber = require('gulp-plumber'),
//   babel = require('gulp-babel');

let paths = gulp.paths = {
  bowerComponents: 'app/bower_components',
  scssFiles: ['app/*/styles/**/*.scss'],
  cssFiles: ['.tmp/*/styles/*.css'],
  dist: 'www',
  htmlFiles: ['app/**/*.html', '!app/bower_components/**/*.html'],
  jsFiles: ['app/**/*.js', '!app/bower_components/**/*.js']
};

requireDir('./gulp');
// or import everything manually:
// import './gulp/building.babel';

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

// gulp.task('script', () => {
//   console.log(chalk.blue('running script task'));
//   return gulp
//     .src('script/script.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     // .pipe(jshint())
//     .pipe(plumber()) //prevent pipe from breaking when errors are thrown
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('www'));
// });

// gulp.task('ts-script', () => {
//   console.log(chalk.blue('running ts script task'));
//   return gulp
//     .src('script/typescript.ts')
//     .pipe(typescript({
//       noImplicitAny: false,
//       out: 'typescript.js'
//     }))
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('www'));
// });

//task that runs when typing in just gulp
gulp.task('default', ['delete', 'style', 'ts-script', 'script', 'watch'], () => {
  console.log(chalk.blue('running default task after tasks in array'));
});

// gulp.task('watch', () => {
//   console.log(chalk.blue('running watch task'));
//   gulp.watch('css/style.css', ['style']);
//   gulp.watch('script/script.js', ['script']);
// });
