/**
 * webpack prod env config
 */
'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const os = require('os');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleBuddyWebpackPlugin = require('bundle-buddy-webpack-plugin');
const InterpolateHtmlPlugin = require('../utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('../utils/ModuleScopePlugin');
const eslintFormatter = require('../utils/eslintFormatter');
const { getEntry, matchKey } = require('../utils/entry');
const swConfig = require('../sw/sw.config');
const paths = require('../env/paths');
const env = require('../env/env');
const peak = require('../../peak.json');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const entry =
  peak.language === 'js'
    ? getEntry('../../src', [require.resolve('../utils/polyfills.js')])
    : getEntry('../../src', [require.resolve('../utils/polyfills.js')], true);
const pathsKey = Object.keys(paths);

const config = {
  bail: true,
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: Object.assign(entry, {
    ...(peak.compiler_commons.length !== 0
      ? { common: peak.compiler_commons }
      : {}),
  }),
  output: {
    path: paths.app_build,
    publicPath: peak.public_path,
    filename: peak.js_path + '[name].[chunkhash:8].js',
    chunkFilename: peak.js_path + '[name].[chunkhash:8].chunk.js',
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.app_src, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
    plugins: [
      // 模块路径映射
      new ModuleScopePlugin(paths.app_src, [paths.app_packageJson]),
    ],
    alias: paths.alias,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        ...(peak.language === 'js'
          ? {
              test: /\.(js|jsx)$/,
              exclude: [
                /node_modules/,
                /bin/,
                /build/,
                /config/,
                /dll/,
                /mock/,
                /public/,
              ],
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('eslint-loader'),
                  options: {
                    formatter: eslintFormatter,
                    eslintPath: require.resolve('eslint'),
                    ignore: [
                      'bin',
                      'config',
                      'dll',
                      'mock',
                      'node_modules',
                      'public',
                    ],
                  },
                },
              ],
              include: paths.app_src,
            }
          : {
              test: /\.(js|jsx)$/,
              enforce: 'pre',
              include: paths.app_src,
              loader: require.resolve('source-map-loader'),
            }),
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: peak.media_path + '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    config: {
                      path: path.resolve(__dirname, '../../'),
                    },
                  },
                },
              ],
            }),
          },
          {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    config: {
                      path: path.resolve(__dirname, '../../'),
                    },
                  },
                },
                {
                  loader: require.resolve('less-loader'),
                  options: {
                    noIeCompat: true,
                  },
                },
              ],
            }),
          },
          {
            ...(peak.language === 'js'
              ? {
                  test: /\.(js|jsx)$/,
                  include: paths.app_src,
                  loader: 'happypack/loader?id=jsx',
                }
              : {
                  test: /\.(ts|tsx)$/,
                  include: paths.app_src,
                  loader: 'happypack/loader?id=tsx',
                }),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: peak.media_path + '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // webpack 2.x 默认配置 为组件和模块分配ID
    // new webpack.optimize.OccurenceOrderPlugin();
    // webpack 2.x 移除 查找相等或近似的模块，去除生成的文件中出现重复的模块
    // new webpack.optimize.DedupePlugin(),
    // 环境变量
    new webpack.DefinePlugin(env.globals),
    // js 压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: false,
        screw_ie8: true, // React doesn't support IE8
        unused: true,
        dead_code: true,
        warnings: false, // uglifyjs 的警告信息
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
    }),
    // load 按需引入
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // 提取共享的依赖
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'manifest'],
      minChunks: Infinity,
    }),
    // 去除重复模块依赖
    new webpack.optimize.AggressiveMergingPlugin(),
    // 设置模块的命名方式为无序的ID命名方式，防止无相关的模块ID发生了改变而修改hash
    new webpack.HashedModuleIdsPlugin(),
    // 生产资源映射表
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // webpack 3.0.0 范围提升（Scope Hoisting）
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 模板替换
    new InterpolateHtmlPlugin(env.html),
    // css
    new ExtractTextPlugin({
      filename: peak.css_path + '[name].[contenthash:8].css',
      disable: false,
      allChunks: true,
    }),
    // service worker
    new SWPrecacheWebpackPlugin(swConfig),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

if (peak.language === 'js') {
  config.plugins.push(
    // 多线程加速代码构建
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
    })
  );
} else {
  const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  config.resolve.plugins.push(
    // ts配置路径
    new TsconfigPathsPlugin({ configFile: paths.app_tsConfig })
  );
  config.plugins.push(
    // 利用子进程来进行ts类型校验,加快编译速度
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: paths.app_tsConfig,
      tslint: paths.app_tslint,
      checkSyntacticErrors: true,
    })
  );
  config.plugins.push(
    new HappyPack({
      id: 'tsx',
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true, transpileOnly: true },
        },
      ],
      threadPool: happyThreadPool,
    })
  );
}

if (peak.compiler_vendors.length !== 0) {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: paths.app,
      manifest: paths.app_dll_dllManifestJson,
    })
  );
}

if (peak.lodashJS) {
  config.plugins.push(
    new LodashModuleReplacementPlugin({
      disable: false,
      config: {
        collections: true,
        paths: true,
      },
    })
  );
}

if (!_.isEmpty(peak.pre)) {
  config.plugins.push(new PreloadWebpackPlugin(peak.pre));
}

if (peak.bundleBuddy) {
  config.plugins.push(
    // 打包后代码分割依赖包分析
    new BundleBuddyWebpackPlugin({ warnings: false })
  );
}

for (let key in entry) {
  config.plugins.push(
    // html
    new HtmlWebpackPlugin({
      inject: true,
      filename: `${paths.app_build}/${key}.html`,
      template: paths[matchKey(pathsKey, key)[0]],
      chunks: [key, 'common', 'manifest', 'vendor'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  );
}

module.exports = config;
