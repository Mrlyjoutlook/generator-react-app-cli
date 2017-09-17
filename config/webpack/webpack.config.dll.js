'use strict';

const webpack = require('webpack');
const paths = require('../env/paths');
const peak = require('../../peak.js');

module.exports = {
  target: 'web',
  entry: {
    vendor: peak.compiler_vendors
  },
  output: {
    path: paths.app_public,
    filename: peak.js_path + '[name].[chunkhash:8].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.DllPlugin({
      context: paths.app,
      name: '[name]_library',
      path: paths.app_dll_dllManifestJson
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: false,
        screw_ie8: true, // React doesn't support IE8
        unused: true,
        dead_code: true,
        warnings: false,  // uglifyjs 的警告信息
        pure_funcs: ['console.log'], // 去除代码console.log
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    })
  ]
};
