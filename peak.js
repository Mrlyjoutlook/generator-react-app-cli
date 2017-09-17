
module.exports = {
  version: '0.2.0',

  bundleAnalyzer: false,
  lodashJS: false,
  vconsole: false,

  host: 'localhost',
  port: 3000,
  mock_port: 3001,

  globals: {},
  resolve_alias: {
    'lazilyload': './src/utils/lazilyload',
  },
  public_path: '/',
  js_path: 'static/js/',
  css_path: 'static/css/',
  media_path: 'static/media/',
  html: {
    DLL: 'static/js/vendor.1ff27d0c.dll.js',
  },
  compiler_commons: [
    'lazilyload',
  ],
  compiler_vendors: [
    'react',
    'react-dom',
  ],
  sw: {},
}
