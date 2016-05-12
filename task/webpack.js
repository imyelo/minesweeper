var _ = require('lodash');
var gulp = require('gulp');
var webpack = require('webpack');
var pack = require('gulp-webpack');
var config = require('./webpack.config.js');

gulp.task('webpack-dev', function () {
  return gulp.src('../package.json') // whatever sources
    .pipe(pack(_.defaultsDeep({
        watch: true,
        output: {
          sourceMapFilename: 'map/[file]-[id].map.js',
          chunkFilename: 'chunk/[name].js'
        },
        devtool: 'source-map',
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
        }
      }, config)))
    .pipe(gulp.dest('./build/static'));
});

gulp.task('webpack', function () {
  return gulp.src('../package.json') // whatever sources
    .pipe(pack(config))
    .pipe(gulp.dest('./build/static'));
});
