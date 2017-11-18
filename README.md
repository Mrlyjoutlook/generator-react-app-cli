# Generator-react-app-cli

> Is a cli for creating react project projects work.  

[![status](https://img.shields.io/badge/version-0.4.1-brightgreen.svg)](https://www.npmjs.com/package/generator-react-app-cli)
[![Build Status](https://www.travis-ci.org/Mrlyjoutlook/generator-react-app-cli.svg?branch=master)]

有时候我们在使用`create-react-app`时候，会发现其缺少定制功能，从而我们需要从`node_modules`中寻找对应的文件进行修改，但团队开发中不能确保`node_modules`中对应的文件的大家都一致，所以我们需要扩展这功能，不得不承认`create-react-app`是一款很优秀的脚手架。本项目是基于`create-react-app`和社区等优秀的脚手架，把所有项目的配置文件均放在`config`目录下，提供给开发者自定修改，但大部分情况，甚至最好不要修改config目录下的文件，因为项目提供配置文件升级的功能，所以会覆盖掉你修改的文件。作者会把实用的功能均通过配置文件`peak.json`提供给开发者，你也可以把需求和好的建议通过`issues`告诉我。

## Table of Contents
- [Requirements](#requirements)
- [Use](#use)
- [Features](#features)
- [Plan](#plan)
- [log](https://github.com/Mrlyjoutlook/generator-react-app-cli/tree/master/doc/log)
- [ConfigFile](#ConfigFile)
- [License](#License)
- [End](#end)

## Requirements

```
node >= 7.6
yarn >= 0.22
npm >= 4.x
```

## Use

```bash
# Install
$ npm i create-react-generator -g

# Create app
$ peak new myapp

# Start app
$ cd myapp
$ npm i
$ npm run dev

# Upgrade
$ npm update
```

*Remarks*
- `npm update`，升级需要先更新**generator-react-app-cli**，升级会覆盖/config、/bin，如果有修改过其下的文件，请备份。

<div>
  <img src="https://github.com/Mrlyjoutlook/generator-react-app-cli/blob/master/doc/terminal.png" width="450px">
  <img src="https://github.com/Mrlyjoutlook/generator-react-app-cli/blob/master/doc/terminal1.png" width="450px">
</div>

## Features
- support redux boilerplate.
- support service work.
- support typescript.
- support command update config(But don’t modify files in the current config directory).

## Plan
Future plans

- [ ] support mobx boilerplate(Development ing).
- [ ] support srr page(Development ing).
- [ ] support multi page.

## ConfigFile
Please edit peak.json.

|key|Description|value|
|---|-----------|-----|
|version|版本号||
|language|脚本类型|`js` or `ts`|
|bundleAnalyzer|模块资源大小分析功能|默认`false`|
|lodashJS|`lodash.Js`按需打包|默认`false`|
|vconsole|移动端开发提供`console`打印等功能|默认`false`|
|host||默认`localhost`|
|port|端口地址|默认`3000`|
|mock_port|`mock server`端口地址|默认`3001`|
|globals|程序全局变量，`webpack DefinePlugin`|默认`{}`|
|public_path|应用的资源相对路径|默认`/`|
|js_path|js资源的路径|默认`static/js/`|
|css_path|css资源的路径|默认`static/css/`|
|media_path|media资源(其它)的路径|默认`static/media/`|
|html|模板变量，可以在html中`<script src="%键名%"></script>`输出|默认`{}`|
|compiler_commons|公用资源打包，建议自定义公用的js代码|默认`[]`|
|compiler_vendors|公用资源打包，建议打包第三方的依赖，使用的是`webpack Dll相关功能`|默认`[]`,没值该功能关闭|
|sw|[service work的配置](https://github.com/goldhand/sw-precache-webpack-plugin), 内置配置`./config/sw/sw.config.js`|默认`{}`|
|pre|[PreloadWebpackPlugin](https://github.com/GoogleChrome/preload-webpack-plugin)插件，当无配置时候默认关闭该功能|默认`{}`|

## Describe
describe about config

### pre
在资源加载上有时需要**prebrowsing**，提前加载或者缓存文件，也是静态资源加载优化的一种方法。

prebrowsing

- dns-prefetch：DNS预解析，告诉浏览器未来我们可能从某个特定的 URL 获取资源，当浏览器真正使用到该域中的某个资源时就可以尽快地完成 DNS 解析。多在使用第三方资源时使用。
- preconnect：预连接，完成 DNS 预解析同时还将进行 TCP 握手和建立传输层协议。
- prerender：预渲染，预先加载文档的所有资源，类似于在一个隐藏的 tab 页中打开了某个链接 – 将下载所有资源、创建 DOM 结构、完成页面布局、应用 CSS 样式和执行 JavaScript 脚本等。
- prefetch：预获取，使用 prefetch 声明的资源是对浏览器的提示，暗示该资源可能『未来』会被用到，适用于对可能跳转到的其他路由页面进行资源缓存。被 prefetch 的资源的加载时机由浏览器决定，一般来说优先级较低，会在浏览器『空闲』时进行下载。
- preload：预加载，主动通知浏览器获取本页的关键资源，只是预加载，加载资源后并不会执行；

前三种浏览器默认内置的优化，`prefetch`和`preload`需要根据实际开发情况。[美团点评Web静态资源缓存及优化](https://juejin.im/post/5a098b5bf265da431a42b227)

## License

Generator-react-app-cli is [MIT licensed.](https://github.com/Mrlyjoutlook/generator-react-app-cli/blob/master/LICENSE)

## End

If you have any questions, you can issues me！Thank you!
