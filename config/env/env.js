'use strict';
const peak = require('../../peak.json');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  globals: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'NODE_ENV': process.env.NODE_ENV,
    '__DEV__': process.env.NODE_ENV === 'development',
    '__PROD__': process.env.NODE_ENV === 'production',
  },
  html: {
    DLL: 'AAA'
  },
  port: process.env.PORT || peak.port,
  mock_port: process.env.PORT + 1 || peak.mock_port || peak.port + 1
};
