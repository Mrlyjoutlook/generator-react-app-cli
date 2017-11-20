/**
 * webpack dev env config
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('../utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('../utils/ModuleScopePlugin');
const eslintFormatter = require('../utils/eslintFormatter');
const { getEntry, matchKey } = require('../utils/entry');
const paths = require('../env/paths');
const env = require('../env/env');
const peak = require('../../peak.json');

const entry = peak.language === 'js' ? getEntry('../../src', [
  require.resolve('../utils/polyfills.js'),
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?path=${peak.public_path}__webpack_hmr`,
]) : paths.app_src_indexTsx;

const pathsKey = Object.keys(paths);

const config = {
  devtool: 'cheap-module-source-map',
  entry,
  output: {
    path: paths.app_build,
    pathinfo: true,
    filename: peak.js_path + '[name].js',
    chunkFilename: peak.js_path + '[name].chunk.js',
    publicPath: peak.public_path,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
    plugins: [
      new ModuleScopePlugin(paths.app_src, [paths.app_packageJson]),
    ],
    alias: paths.alias,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {...peak.language === 'js' ? {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /bin/, /build/, /config/, /dll/, /mock/, /public/],
        enforce: 'pre',
        use: [{
          loader: require.resolve('eslint-loader'),
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),
            ignore: ["bin", "config", "dll", "mock", "node_modules", "public"],
          },
        }],
        include: paths.app_src,
      } : {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /bin/, /build/, /config/, /dll/, /mock/, /public/],
        enforce: 'pre',
        use: [{
          loader: require.resolve('tslint-loader'),
        }],
        include: paths.app_src,
      }},
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              }, {
                loader: require.resolve('postcss-loader'),
                options: {
                  config: {
                    path: path.resolve(__dirname, '../../'),
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              }, {
                loader: require.resolve('postcss-loader'),
                options: {
                  config: {
                    path: path.resolve(__dirname, '../../'),
                  },
                },
              }, {
                loader: require.resolve('less-loader'),
                options: {
                  noIeCompat: true,
                },
              },
            ],
          },
          {
            ...peak.language === 'js' ? {
              test: /\.(js|jsx)$/,
              include: paths.app_src,
              use: [
                require.resolve('react-hot-loader/webpack'),
                require.resolve('babel-loader'),
              ],
            } : {
              test: /\.(ts|tsx)$/,
              include: paths.app_src,
              use:[
                require.resolve('react-hot-loader/webpack'),
                require.resolve('awesome-typescript-loader'),
              ],
            },
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 模板替换
    new InterpolateHtmlPlugin(env.html),
    // css
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      disable: false,
      allChunks: true,
    }),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin(),
    // 环境变量
    new webpack.DefinePlugin(env.globals),
    // 打印错误路径
    new CaseSensitivePathsPlugin(),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
}

if (peak.language === 'ts') {
  config.module.rules.push(
    {
      test: /\.js$/,
      enforce: "pre",
      include: paths.app_src,
      loader: require.resolve('source-map-loader'),
    }
  )
}

if (peak.vconsole) {
  config.plugins.push(
    // 移动开发log工具
    new vConsolePlugin({ enable: true })
  );
}

if (peak.compiler_vendors.length !== 0) {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: paths.app,
      manifest: paths.app_dll_dllManifestJson,
    })
  )
}

if (peak.bundleAnalyzer) {
  config.plugins.push(
    // 包大小分析工具
    new BundleAnalyzerPlugin()
  );
}

for (let key in entry) {
  config.plugins.push(
    // html
    new HtmlWebpackPlugin({
      inject: true,
      filename: `${paths.app_build}/${key}.html`,
      template: paths[matchKey(pathsKey, key)[0]],
      chunksSortMode: 'none',
      chunks: [key],
    })
  );
}

module.exports = config;
