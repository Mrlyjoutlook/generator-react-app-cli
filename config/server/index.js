'use strict';

const express = require('express');
const webpack = require('webpack');
const compress = require('compression');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
const webpackConfig = require('../webpack/webpack.config.dev');
const env = require('../env/env');
const paths = require('../env/paths');

const app = express();
app.use(compress());

if (env.env === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.app,
    hot: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  }));
  app.use(hotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));

  // proxy 代理功能
  app.use('/api', proxy({ target: 'http://localhost:80', changeOrigin: true }));

  app.use(express.static(paths.app_public));
} else {
  app.use(express.static(paths.app_public));
}

module.exports = app;
