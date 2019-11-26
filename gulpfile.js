const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;

gulp.task('compress', () => {
  return gulp.src('./src/**/*.js')
    .pipe(uglify({
      ecma: 6
    }))
    .pipe(gulp.dest('./min'));
});

exports.default = gulp.task('default', gulp.series('compress'));
