const webpack = require('webpack');
const devConfig = require('./webpack.config.js');

const define = new webpack.DefinePlugin({
  __API_URL__: '\'https://localhost:8080/api\'',
  __APP_URL__: '\'https://localhost:8000\'',
});
devConfig.cache = true;
devConfig.debug = true;
devConfig.devtool = 'source-map';
devConfig.plugins.push(define);
devConfig.devServer = {
  port: 8000,
  historyApiFallback: true,
};
module.exports = devConfig;
