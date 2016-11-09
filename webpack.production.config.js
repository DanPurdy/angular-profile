const webpack = require('webpack');
const WebpackStripLoader = require('strip-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devConfig = require('./webpack.config.js');

const stripLoader = {
  test: [/\.js$/, /\.es6$/],
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log', 'console.error'),
};
const clean = new CleanWebpackPlugin(['dist'],
  {
    root: __dirname,
    verbose: true,
    dry: false,
  });
const define = new webpack.DefinePlugin({
  __API_URL__: '\'http://localhost:8080/api\'',
  __APP_URL__: '\'https://localhost:8000\'',
});

const angularDeps = [
  'angular',
  'angular-ui-router',
  'angular-ui-bootstrap',
  'angular-animate',
  'angular-messages',
  'angular-jwt',
  'angular-animate',
  'angular-aria',
  'angular-storage',
];

const chunks = new webpack.optimize.CommonsChunkPlugin('angular-deps', 'vendors.js', Infinity);

const occurrence = new webpack.optimize.OccurenceOrderPlugin();
const dedupe = new webpack.optimize.DedupePlugin();

devConfig.module.loaders.push(stripLoader);
devConfig.entry['angular-deps'] = angularDeps;
devConfig.plugins.push(clean);
devConfig.plugins.push(define);
devConfig.plugins.push(chunks);
devConfig.plugins.push(occurrence);
devConfig.plugins.push(dedupe);
module.exports = devConfig;
