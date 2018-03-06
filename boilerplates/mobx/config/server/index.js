'use strict';

const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const compress = require('compression');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
const formatWebpackMessages = require('../utils/formatWebpackMessages');
const clearConsole = require('../utils/clearConsole');
const webpackConfig = require('../webpack/webpack.config.dev');
const env = require('../env/env');
const paths = require('../env/paths');

const app = express();
app.use(compress());

if (env.env === 'development') {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  compiler.plugin('invalid', () => {
    if (process.stdout.isTTY) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  compiler.plugin('done', stats => {
    if (process.stdout.isTTY) {
      clearConsole();
    }

    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));
    }
  });

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.app,
    hot: true,
    quiet: true,
    historyApiFallback: false,
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
