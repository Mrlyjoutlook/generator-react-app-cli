'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');

/**
 * 校验是配置文件是否有使用webpack dll插件功能
 *   判断参数路径下是否存在dll-manifest.json文件
 * @param {*} isCheck
 * @param {*} jsonPath
 */
function checkIsUseDll(isCheck, jsonPath) {
  return new Promise((resolve, reject) => {
    if (!isCheck) {
      reject(new Error('Not started!'));
    };
    if (fs.existsSync(jsonPath)) {
      console.log(chalk.dim('Check if the file(dll-manifest.json) exists:\n'));
      console.log('     ' + chalk.green('Exist!'));
      console.log();
      resolve('');
    } else {
      console.log(chalk.dim('Check if the file(dll-manifest.json) exists:\n'));
      console.log('     ' + chalk.red('No search!'));
      console.log('     ' + chalk.red('Please run: npm run dll!'));
      console.log();
      reject('');
    }
  });
}

/**
 *
 * @param {*} cur
 * @param {*} pre
 */
function checkConfigisEqual(cur, pre) {
  return new Promise((resolve, reject) => {
    const c = cur.sort();
    const p = pre.sort();
    if (c.length !== p.length || !isEqual(c.length, c, p)) {
      console.log(chalk.dim('File(dll-manifest.json) config changed:\n'));
      console.log('     ' + chalk.red('Please run: npm run dll!'));
      console.log();
      reject('');
    } else {
      console.log(chalk.dim('File(dll-manifest.json) config changed:\n'));
      console.log('     ' + chalk.green('Can use.'));
      console.log();
      resolve('');
    }
  });
}

function isEqual(i, c, p) {
  while(i--) {
    if (c[i] !== p[i]) {
      return false;
    }
  }
  return true;
}

/**
 * 移动参数src目录下dll-manifest.json到参数dest
 * @param {*目录路径} src
 * @param {*移动的路径} dest
 */
function moveDllManifestFile(src, dest) {
  fs.moveSync(src + '/dll-manifest.json', dest);
}

module.exports = {
  checkIsUseDll,
  checkConfigisEqual
};
