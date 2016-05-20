var gulp = require('gulp');

gulp.task('copy', function (cb) {
  return gulp.src('./src/index.html', {
      base: './src'
    })
    .pipe(gulp.dest('./build'));
});
