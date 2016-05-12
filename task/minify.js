var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('uglify', function () {
  return gulp.src('./build/static/**/*.js', {
      base: './build'
    })
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('htmlmin', function () {
  return gulp.src('./build/view/**/*.ejs', {
      base: './build'
    })
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
});

gulp.task('minify', ['uglify', 'htmlmin'])
