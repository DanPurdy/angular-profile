const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const appPath = path.join(__dirname, 'app');
const distPath = path.join(__dirname, 'dist');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(appPath, 'bootstrap.js'),
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
  output: {
    path: path.join(distPath),
    filename: 'bundle-[hash:6].js',
    chunkFilename: '[id].js',
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: [/(node_modules)/, /bower_components/],
    }],
    loaders: [{
      test: /\.html$/,
      exclude: /index\.html$/,
      loader: 'ng-cache?prefix=[dir]/[dir]',
    }, {
      test: /\.json$/,
      loader: 'file?name=json/[name].json',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file?name=img/[name].[ext]',
      // inline base64 URLs for <=10kb images, direct URLs for the rest
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
    }, {
      test: /\.scss$/,
      exclude: [/(node_modules)/, /bower_components/],
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss-loader!sass?sourceMap'),
    }, {
      test: /\.js$/,
      exclude: [/(node_modules)/, /bower_components/],
      loader: 'ng-annotate?add=true!babel?presets[]=es2015',
    }, {
      test: [
        /fontawesome-webfont\.svg/,
        /fontawesome-webfont\.eot/,
        /fontawesome-webfont\.ttf/,
        /fontawesome-webfont\.woff/,
        /fontawesome-webfont\.woff2/,
      ],
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
    }, {
      test: /[/]angular\.js$/,
      loader: 'exports?angular',
    }],
  },
  postcss: () => (
    [autoprefixer]
  ),
  eslint: {
    // setting this to prevent errors breaking the dev-server build
    emitWarning: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg,
      template: path.join(appPath, 'index.html'),
    }),
    new SassLintPlugin({
      context: './app',
    }),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']),
    ]),
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),
    new WebpackNotifierPlugin({
      title: 'Angular-Profile: Build Status',
    }),
  ],
};
