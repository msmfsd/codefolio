'use strict';
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DEV = process.env.NODE_ENV !== 'production'

const config = {
  entry: ['./src/index.js'],
  devtool: DEV ? 'source-map' : 'source-map',
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loaders: ['babel']
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
      loader: 'url-loader?name=[path][name].[ext]&context=./src'
    }, {
      test: /\.html/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.css$/,
      loader: DEV ? 'style?sourceMap!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' : ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    },
    { test: /\.json/, loader: 'json'},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?mimetype=application/vnd.ms-fontobject'},
    {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    {test: /.svg(\?v=\d+\.\d+\.\d+)?$|.svg$/, loader: 'file?name=[path][name].[ext]&context=./src&mimetype=image/svg+xml'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['dist'], { root: __dirname }),
  ],
  postcss: () => {
    return [
      require('postcss-sorting'),
      require('postcss-advanced-variables')({ variables: require('./src/assets/css/cssvars') }),
      require('postcss-cssnext'),
      require('postcss-extend')
    ]
  }
}

if (DEV) {
  console.log('_____dev_build______')
  config.entry.push('webpack-hot-middleware/client');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  console.log('_____prod_build______')
  config.plugins.push(
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/assets/public') + '/index-prod.html', to: 'index.html' },
      { from: path.join(__dirname, 'src/assets/public') + '/browserconfig.xml' },
      { from: path.join(__dirname, 'src/assets/public') + '/static', to: 'static' },
      { from: path.join(__dirname, 'src/assets/public') + '/vendor', to: 'vendor' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('"production"')
      }
    })
  )
}

module.exports = config
