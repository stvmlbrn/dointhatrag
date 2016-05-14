var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var PATHS = {
  src: path.join(__dirname, 'public/src/js/main.js'),
  build: path.join(__dirname, 'public/dist/')
};

module.exports = {
  entry: {

  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '/public/src/js')
        ],
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new WebpackNotifierPlugin()
  ]
};
