'use strict';

const debug = require('debug')('app:bin:build');
const fs = require('fs-extra');
const webpack = require('webpack');
const FileSizeReporter = require('../config/utils/FileSizeReporter');
const formatWebpackMessages = require('../config/utils/formatWebpackMessages');
const printBuildError = require('../config/utils/printBuildError');
const clearConsole = require('../config/utils/clearConsole');
const config = require('../config/webpack/webpack.config.prod');
const paths = require('../config/env/paths');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

process.on('unhandledRejection', err => {
  throw err;
});

function build(previousFileSizes) {
  debug('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        debug(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
          'Most CI servers set it automatically.\n'
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      debug('Spend Time: ' + ((stats.endTime - stats.startTime)/1000));

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.app_public, paths.app_build, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

measureFileSizesBeforeBuild(paths.app_build)
  .then(previousFileSizes => {
    fs.emptyDirSync(paths.app_build);
    copyPublicFolder();
    clearConsole();
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        debug('Compiled with warnings.');
        debug(warnings.join('\n\n'));
      } else {
        debug('Compiled successfully.');
      }

      debug('File sizes after gzip:');
      console.log();
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.app_build,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();
      debug('Build OK.');
    },
    err => {
      debug('Failed to compile.');
      printBuildError(err);
      process.exit(1);
    }
  )
