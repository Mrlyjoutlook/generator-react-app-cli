# Create-react-generator
[![NPM version][https://img.shields.io/badge/{npm}-{0.0.1}-519dd9.svg]][npm-url] [![Downloads][https://img.shields.io/cocoapods/dm/AFNetworking.svg]][npm-url]

Is a cli for creating react project projects work.  

有时候我们在使用`create-react-app`时候，会发现其缺少定制功能，从而我们需要从`node_modules`中寻找对应的文件进行修改，但团队开发中不能确保`node_modules`中对应的文件的大家都一致，所以我们需要扩展这功能，不得不承认`create-react-app`是一款很优秀的脚手架。本项目是基于`create-react-app`和社区等优秀的脚手架，把所有项目的配置文件均放在`config`目录下，提供给开发者自定修改，但大部分情况，甚至最好不要修改config目录下的文件，因为项目提供配置文件升级的功能，所以会覆盖掉你修改的文件。作者会把实用的功能均通过配置文件`peak.json`提供给开发者，你也可以把需求和好的建议通过`issues`告诉我。

## Table of Contents
- [Requirements](#requirements)
- [Use](#use)
- [Features](#features)
- [ConfigFile](#ConfigFile)
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
```

## Features
- support redux boilerplate.
- support mobx boilerplate(Development ing).
- support command update config(But don’t modify files in the current config directory).

## ConfigFile
Please edit peak.json.

|key|Description|value|
|---|-----------|-----|
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

## End

If you have any questions, you can issues me！Thank you!
