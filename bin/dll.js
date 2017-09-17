'use strict';

const debug = require('debug')('app:bin:dll');
const webpack = require('webpack');
const filesize = require('filesize');
const chalk = require('chalk');
const fs = require('fs-extra');
const config = require('../config/webpack/webpack.config.dll');
const clearConsole = require('../config/utils/clearConsole');
const dll = require('../config/utils/dll');
const env = require('../config/env/env');
const paths = require('../config/env/paths');
const peak = require('../peak.js');

clearConsole();
debug('Creating an optimized production build...');

webpack(config).run((err, stats) => {
  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    return false;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    debug(jsonStats.errors.join('\n'))
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')
    debug(jsonStats.warnings.join('\n'))
  } else {
    const {assets, endTime, startTime} = jsonStats;
    const {name, size} = jsonStats.assets[0];

    fs.writeJsonSync(paths.app_dll_dllConfigJson, {
      name,
      size,
      chunk: peak.compiler_vendors
    });

    console.log(chalk.dim('\nFile info:\n'));
    console.log('     ' + filesize(size, {base: 10}) + '  ' + chalk.cyan(name));
    console.log();

    console.log(chalk.dim('build file(dll-config.json):\n'));
    console.log('     ' + chalk.dim('name: ') + chalk.cyan(name));
    console.log('     ' + chalk.dim('size: ') + chalk.cyan(size));
    console.log('     ' + chalk.dim('chunk: ') + chalk.cyan(peak.compiler_vendors));
    console.log();

    debug('Spend Time: ' + ((endTime - startTime)/1000));
    debug('Build OK!');

    console.log(chalk.dim('\nWarn:\n'));
    console.log('     ' + chalk.yellow('please edit peak.js(html), add key-value'));
    console.log('     ' + chalk.yellow('eg:'));
    console.log('       ' + chalk.yellow('{...'));
    console.log('       ' + chalk.yellow('html: { test: **/**/**.js }'));
    console.log('       ' + chalk.yellow('...}'));
    console.log();
    console.log('     ' + chalk.yellow('please edit index.html templ, print key'));
    console.log('     ' + chalk.yellow('eg:'));
    console.log('       ' + chalk.yellow('<script src="%test%"></script>'));
    console.log();
  }
});
