var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css');

gulp.task('style', function(){
  return gulp.src('css/style.css')
            .pipe(cleanCSS())
            .pipe(gulp.dest('www'));
});
