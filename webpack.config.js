const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map',
  entry: DEV ? [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/Router'
  ] : [ './src/Router' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: {
    'ExternalConfig': JSON.stringify(DEV ? require('./config/config.dev.json') : require('./config/config.prod.json'))
  },
  plugins: DEV ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src') + '/assets/html/index-prod.html',
      environment: 'production'
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src') + '/assets/html/browserconfig.xml' },
      { from: path.join(__dirname, 'src') + '/assets/html/static', to: 'static' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css', {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /(node_modules)/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loader: DEV ? 'style?sourceMap!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss' :ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      { test: /\.json/, exclude: /(node_modules)/, loader: 'json'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, exclude: /(node_modules)/, loader: "file" },
			{ test: /\.(woff|woff2)$/, exclude: /(node_modules)/, loader: "url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, exclude: /(node_modules)/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules)/, loader: "url-loader?limit=10000" }
    ]
  },
  postcss: () => {
    return [
      require('postcss-import'),
      require('postcss-sorting'),
      require('postcss-advanced-variables')({ variables: require('./src/assets/css/CSSVars') }),
      require('postcss-cssnext'),
      require('postcss-extend')
    ]
  }
}
