'use strict';

const path = require('path');
const fs = require('fs');
const peak = require('../../peak.json');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const alias = ((obj) => {
  let result = {};
  const keys = Object.keys(obj);
  keys.map((item) => {
    result[item] = resolveApp(obj[item]);
  });
  return result;
})(peak.resolve_alias);

module.exports = {
  app: resolveApp(''),
  app_build: resolveApp('build'),
  app_public: resolveApp('public'),
  app_dll: resolveApp('dll'),
  app_dll_dllManifestJson: resolveApp('dll/dll-manifest.json'),
  app_dll_dllConfigJson: resolveApp('dll/dll-config.json'),
  app_src: resolveApp('src'),
  app_src_indexJs: resolveApp('src/index.js'),
  app_src_indexTsx: resolveApp('src/index.tsx'),
  app_src_indexHtml: resolveApp('src/index.html'),
  app_mock: resolveApp('mock'),
  app_packageJson: resolveApp('package.json'),
  alias,
};
