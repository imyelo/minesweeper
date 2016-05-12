var gulp = require('gulp');
var rev = require('gulp-rev');
var replace = require('gulp-rev-replace');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('rev', function () {
  return gulp.src('./build/static/entry/*.js', {
      base: './build'
    })
    .pipe(vinylPaths(del))
    .pipe(rev())
    .pipe(gulp.dest('./build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/'));
});

gulp.task('rev-replace', function () {
  return gulp.src('./src/view/**/*.ejs')
    .pipe(replace({
      manifest: gulp.src('./build/rev-manifest.json'),
      replaceInExtensions: ['.ejs']
    }))
    .pipe(gulp.dest('./build/view'))
});
