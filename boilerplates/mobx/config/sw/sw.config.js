/**
 * service work 常规配置
 */
const peak = require('../../peak.json');

module.exports = Object.assign({}, {
  cacheId: 'app-cache',

  filename: 'service-worker.js',

  dontCacheBustUrlsMatching: /\.\w{8}\./,

  /**
   * 需缓存的文件配置
   * 需动态缓存的放到runtimeCaching中处理
   *
   * @type {Array}
   */
  staticFileGlobs: [],

  /**
   * 缓存所有静态文件，webpack生成的静态资源全部缓存
   * @type {boolean}
   */
  mergeStaticsConfig: true,

  /**
   * 不需要缓存的文件
   * @type {Array}
   */
  staticFileGlobsIgnorePatterns: [
      /\.map$/,
      /asset-manifest\.json$/,
  ],

  /**
   * 需要省略掉的前缀名
   * @type {string}
   */
  stripPrefix: '/',

  /**
   * 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的
   * @type {string}
   */
  navigateFallback: '/index.html',

  /**
   * 白名单包含所有的.html (for HTML imports) 和
   * 路径中含’/data/’(for dynamically-loaded data).
   * @type {Array}
   */
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],

  /**
   * 是否压缩，默认不压缩
   * @type {boolean}
   */
  minify: true,

  // maximumFileSizeToCacheInBytes: 4194304, // 最大缓存大小

  /**
   * 是否 verbose
   * @type {boolean}
   */
  verbose: true,


  /**
   * 需要根据路由动态处理的文件
   * 如果在staticFileGlobs中设置相同的缓存路径，可能导致此处不起作用
   * @type {Array}
   */
  runtimeCaching: [
    {
      urlPattern: /\/vendor/,
      handler: 'cacheFirst',
    },
  ],
}, peak.sw);

