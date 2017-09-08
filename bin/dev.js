'use strict';

const debug = require('debug')('app:bin:dev');
const open = require('open');
const clearConsole = require('../config/utils/clearConsole');
const server = require('../config/server');
const env = require('../config/env/env');

process.on('unhandledRejection', err => {
  throw err;
});

server.listen(env.port, err=>{
  if (err) {
    return debug('Server error:' + err);
  }
  if (process.stdout.isTTY) {
    clearConsole();
  }
  debug(`==> 🌎  Development Listening on port ${env.port}. Open up http://localhost:${env.port}/ in your browser.`);
  open('http://localhost:' + env.port );
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
