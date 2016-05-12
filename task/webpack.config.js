var webpack = require('webpack');
var path = require('path');
var APP_PATH = path.resolve(__dirname, '../src/static');

module.exports = {
  context: APP_PATH,
  entry: {
    app: ['babel-polyfill', './app/main.jsx']
  },
  output: {
    filename: 'entry/[name].js',
    chunkFilename: 'chunk/[name]-[chunkhash].js',
    publicPath: '/mobile/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: "style!css!autoprefixer"
    }, {
      test: /\.less$/,
      loader: "style!css!autoprefixer!less?relativeUrls"
    }, {
      test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff2?)$/,
      loader: "file?name=asset/[hash].[ext]"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.ProgressPlugin(function (percentage, message) {
      const percent = Math.round(percentage * 100);
      process.stderr.clearLine();
      process.stderr.cursorTo(0);
      process.stderr.write(percent + '% ' + message);
    })
  ]
};
