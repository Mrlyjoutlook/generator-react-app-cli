'use strict';

const path = require('path');
const fs = require('fs');
const peak = require('../../peak.json');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const alias = (obj => {
  let result = {};
  const keys = Object.keys(obj);
  keys.map(item => {
    result[item] = resolveApp(obj[item]);
  });
  return result;
})(peak.resolve_alias);

const entryObj = fs
  .readdirSync(path.resolve(__dirname, '../../src'))
  .filter(filename => /\.(js|jsx)$/.test(filename) || /\.html$/.test(filename))
  .reduce((pre, cur) => {
    const name = cur.split('.');
    pre[
      `app_src_${name[0]}${name[1].substring(0, 1).toUpperCase() +
        name[1].substring(1)}`
    ] = resolveApp('src/' + cur);
    return pre;
  }, {});

module.exports = Object.assign(
  {
    app: resolveApp(''),
    app_build: resolveApp('build'),
    app_public: resolveApp('public'),
    app_dll: resolveApp('dll'),
    app_dll_dllManifestJson: resolveApp('dll/dll-manifest.json'),
    app_dll_dllConfigJson: resolveApp('dll/dll-config.json'),
    app_src: resolveApp('src'),
    app_mock: resolveApp('mock'),
    app_packageJson: resolveApp('package.json'),
    alias,
  },
  entryObj
);
