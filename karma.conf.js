var webpack = require('webpack')
var postcss = require('postcss')

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['progress', 'mocha'],
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ['babel']
        }, {
          test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
          loader: 'url-loader?name=[path][name].[ext]&context=./src'
        }, {
          test: /\.css$/,
          loader: 'style?sourceMap!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        }
        ]
      },
      postcss: () => {
        return [
          require('postcss-sorting'),
          require('postcss-advanced-variables')({ variables: require('./src/assets/css/cssvars') }),
          require('postcss-cssnext'),
          require('postcss-extend')
        ]
      },
      resolve: {
        extensions: ['', '.js']
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  })
}
