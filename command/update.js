#!/usr/bin/env node
'use strict';

const path = require('path');
const inquirer = require('inquirer');
const { writeJsonSync, copySync } = require('fs-extra');
const chalk = require('chalk');
const peak = require('../peak.json');
const curPath = path.join(process.cwd());
const peakFile = require(curPath + '/peak.json');

if (peak.version === peakFile.version) {
  console.log(chalk.red('peak: check result: \n'));
  console.log('     ' + chalk.magenta('The local version is the same as the current version!'));
  console.log('     ' + chalk.magenta('You can upgrade the local version.'));
  console.log('     ' + chalk.magenta('Please run the following command(npm i create-react-generator -g).\n'));
} else {
  inquirer.prompt([{
    type: 'confirm',
    message: chalk.green('peak: Please see the warning.\n') + chalk.yellow('当前升级会覆盖文件夹（/bin、/config），合拼文件（peak.json）.\n') + chalk.gray('Upgrade？'),
    name: 'update',
  }]).then((v) => {
    if (v) {
      if (peak.version > peakFile.version) {
        console.log(chalk.green('peak: check result: \n'));
        console.log('     ' + chalk.green('The local version is not the same as the current version!\n'));
        console.log(chalk.green('peak: update...'));

        const newFile = Object.assign(peakFile, peak, { language: peakFile.language });
        writeJsonSync(curPath + '/peak.json', newFile);
        copySync(path.join(__dirname, '../config'), curPath + '/config', { overwrite: true });
        copySync(path.join(__dirname, '../bin'), curPath + '/bin', { overwrite: true });

        console.log(chalk.green('peak: Upgrade completed！'));
      } else {
        console.log(chalk.red('peak: Please run the following command(npm i create-react-generator -g).'));
      }
    } else {
      console.log(chalk.green('cancel！'));
    }
  });
}
