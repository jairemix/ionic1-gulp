/** works with babel-core and babel-rc **/
import gulp from 'gulp';
import chalk from 'chalk';
import del from 'del';
import cleanCSS from 'gulp-clean-css';
// import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

console.log(chalk.green('building file loaded'));

gulp.task('build-bower', () => {
  console.log(chalk.blue('running build bower task'));
  return gulp
    .src(`${gulp.paths.bowerComponents}/**/*.js`) //TODO revise
    .pipe(gulp.dest(`${gulp.paths.dist}/bower_components`));
});

gulp.task('build', ['build-html', 'build-bower'], () => {
  console.log(chalk.blue('running build task'));
  return gulp
    .src(gulp.paths.jsFiles)
    // .pipe(concat('script.js')) //concatenate before transpiling to avoid repeated es5 code
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(plumber()) //prevent pipe from breaking when errors are thrown
    // .pipe(uglify())
    // .pipe(rename({ suffix: '.es5' }))
    .pipe(gulp.dest(gulp.paths.dist));
});

gulp.task('build-html', () => {
  console.log(chalk.blue('running build html task'));
  return gulp
    .src(gulp.paths.htmlFiles)
    .pipe(gulp.dest(gulp.paths.dist));
});
