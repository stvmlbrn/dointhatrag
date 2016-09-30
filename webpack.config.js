var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var PATHS = {
  src: path.join(__dirname, 'src/js/'),
  build: path.join(__dirname, 'app/public/build/')
};

module.exports = {
  entry: {

  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise'
    }),
    new WebpackNotifierPlugin(),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]
};
