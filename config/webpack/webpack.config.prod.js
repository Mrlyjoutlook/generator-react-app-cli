/**
 * webpack prod env config
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const os = require('os');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const InterpolateHtmlPlugin = require('../utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('../utils/ModuleScopePlugin');
const eslintFormatter = require('../utils/eslintFormatter');
const swConfig = require('../sw/sw.config');
const paths = require('../env/paths');
const env = require('../env/env');
const peak = require('../../peak.json');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const entry = peak.language === 'js' ? paths.app_src_indexJs : paths.app_src_indexTsx

const config = {
  bail: true,
  target: 'web',
  devtool: 'source-map',
  entry: Object.assign({
    app: [
      require.resolve('../utils/polyfills.js'),
      entry,
    ],
  }, {
    ...peak.compiler_commons.length !== 0 ?
    {common: peak.compiler_commons,} : {},
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
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', 'ts', 'tsx'],
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
              name: peak.media_path + '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: [{
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              }, {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }],
            }),
          },
          {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: [{
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              }, {
                loader: require.resolve('less-loader'),
                options: {
                  noIeCompat: true,
                },
              }],
            }),
          },
          {
            ...peak.language === 'js' ? {
              test: /\.(js|jsx)$/,
              include: paths.app_src,
              loader: 'happypack/loader?id=jsx',
            } : {
              test: /\.(ts|tsx)$/,
              include: paths.app_src,
              loader: 'awesome-typescript-loader',
            },
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
    // html
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.app_src + '/index.html',
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
    }),
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
      verbose: true,
    })
  )
} else {
  const { CheckerPlugin } = require('awesome-typescript-loader');
  config.plugins.push(
    new CheckerPlugin()
  )
}

if (peak.compiler_vendors.length !== 0) {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: paths.app,
      manifest: paths.app_dll_dllManifestJson,
    })
  )
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
  )
}

module.exports = config;
