module.exports = (config) => {
  config.set({
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './__tests__/*_test.js'
    ],
    preprocessors: { './__tests__/*_test.js': ['webpack'] },
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
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
      },
      externals: {
        'ExternalConfig': JSON.stringify(require('./config/config.dev.json'))
      },
      resolve: {
        extensions: ['', '.js']
      }
    },
    webpackMiddleware: {
      noInfo: true // turn off verbose logging of webpack compilation.
    },
    webpackServer: {
      noInfo: false // please don't spam the console when running in karma!
    },
    singleRun: false,
    plugins: [
      'karma-phantomjs-shim',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ]
  });
};
