# change log

* [0.7.1](#0.7.1)
* [0.7.0](#0.7.0)
* [0.6.0](#0.6.0)
* [0.5.4](#0.5.4)
* [0.5.3](#0.5.3)
* [0.5.2](#0.5.2)
* [0.5.1](#0.5.1)
* [0.5.0](#0.5.0)
* [0.4.1](#0.4.1)
* [0.4.0](#0.4.0)

## 0.7.1

* 修复多页面是，prod 打包没排除 common

**此版本会为 0.x release 版，下次会进行重构打升级，故此版本为一个阶段性版本**

## 0.7.0

* 添加 mobx typescript 模板
* 修改 webpack typescript 开发配置
* 由于 @types/react-dom 中 react.d.ts 申明文件有误且会覆盖，故已移除，不影响开发

## 0.6.0

* 添加 mobx 模板

## 0.5.4

* 修改 package.json 中 react 版本默认 16，移除 react pref 工具
* 修改 js 模板异步加载案例，全面使用`react-loadable`

## 0.5.3

* 添加 js 模板 bundle-loader 插件懒加载使用案列

## 0.5.2

* 添加 react-optimize 代码优化插件

## 0.5.1

* 完善 typescript 多页面开发
* 添加 bundle-buddy-webpack-plugin 插件的功能 bundleBuddy
* fix bug

## 0.5.0

* 添加资源预加载功能 preloadWebpack 插件
* babel-presets-env 替换 babel-presets-2015
* 增加多页面开发功能

## 0.4.1

fix postcss config bug、 webpack error formatter is not function.

## 0.4.0

add redux boilerplate about typescript.
