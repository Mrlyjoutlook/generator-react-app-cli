'use strict';

const debug = require('debug')('app:bin:dev');
const clearConsole = require('../config/utils/clearConsole');
const openBrowser = require('../config/utils/openBrowser');
const { checkIsUseDll, checkConfigisEqual } = require('../config/utils/dll');
const env = require('../config/env/env');
const paths = require('../config/env/paths');
const peak = require('../peak.json');

process.on('unhandledRejection', err => {
  throw err;
});

clearConsole();

checkIsUseDll(peak.compiler_vendors.length !== 0, paths.app_dll_dllManifestJson)
  .then(
    (checkConfig) => {
      if (checkConfig) {
        return checkConfigisEqual(peak.compiler_vendors, require(paths.app_dll_dllConfigJson).chunk);
      } else {
        return true
      }
    },
    () => {
      process.exit(1);
    }
  )
  .then(
    () => {
      require('../config/server').listen(env.port, err => {
        if (err) {
          return debug('Server error:' + err);
        }
        if (process.stdout.isTTY) {
          clearConsole();
        }
        debug(`==> 🌎  Development Listening on port ${env.port}. Open up http://localhost:${env.port}/ in your browser.`);
        openBrowser('http://localhost:' + env.port);
      });
    },
    () => {
      process.exit(1);
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
