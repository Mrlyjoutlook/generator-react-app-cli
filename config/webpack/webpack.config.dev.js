/**
 * webpack dev env config
 */
'use strict';

const path = require('path');
const debug = require('debug')('app:config:webpack:dev');
const webpack = require('webpack');
const os = require('os');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('../utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('../utils/ModuleScopePlugin');
const paths = require('../env/paths');
const env = require('../env/env');
const peak = require('../../peak.json');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('../utils/polyfills.js'),
    `webpack-hot-middleware/client?path=${peak.public_path}__webpack_hmr`,
    paths.app_src_indexJs
  ],
  output: {
    path: paths.app_build,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
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
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   use: [],
      //   include: paths.app_src,
      // },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            }
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
                }
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
                }
              }
            ]
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
                }
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  noIeCompat: true,
                }
              },
            ]
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.app_src,
            loader: require.resolve('babel-loader'),
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    // 模板替换
    new InterpolateHtmlPlugin(env.html),
    // html
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.app_src_indexHtml,
    }),
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
  }
}
debug(config)

if (peak.vconsole) {
  config.plugins.push(
    // 移动开发log工具
    new vConsolePlugin({ enable: true })
  );
}

if (peak.bundleAnalyzer) {
  config.plugins.push(
    // 包大小分析工具
    new BundleAnalyzerPlugin()
  );
}

module.exports = config;
