// ==============================================================================
//
//  karma.conf.js
//
// ==============================================================================

const webpackConfig = require('./webpack.dev.config.js');
webpackConfig.entry = {};

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon', 'sinon-chai', 'chai'],
    files: [
      './app/bootstrap.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './app/test.js',
    ],
    exclude: [],
    preprocessors: {
      './app/bootstrap.js': ['babel', 'webpack', 'sourcemap'],
      './app/test.js': ['babel', 'webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline',
      },
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      // 'Chrome',
      'PhantomJS',
    ],
    singleRun: false,
    concurrency: Infinity,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without
      // killing phantom)
      exitOnResourceError: true,
    },
  });
};
