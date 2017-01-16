/** works with babel-core and babel-rc **/
import gulp from 'gulp';
import chalk from 'chalk';
import del from 'del';
import cleanCSS from 'gulp-clean-css';
// import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import debug from 'gulp-debug';

console.log(chalk.green('building file loaded'));

gulp.task('build-styles', () => {
  console.log(chalk.blue('running styles task'));
  return gulp.src('app/**!(bower_components)/!(_)*.scss')
    // .pipe(debug())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    // .pipe(autoprefixer({ browsers: ['last 2 versions'], remove: false}))
    .pipe(gulp.dest(gulp.paths.dist));
});

gulp.task('build-bower', () => {
  console.log(chalk.blue('running build bower task'));
  return gulp
    .src(`${gulp.paths.bowerComponents}/**/*.js`) //TODO revise
    .pipe(gulp.dest(`${gulp.paths.dist}/bower_components`));
});

gulp.task('build', ['build-styles', 'build-html', 'build-bower'], () => {
  console.log(chalk.blue('running build task'));
  return gulp
    .src(gulp.paths.jsFiles)
    // .pipe(debug())
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
