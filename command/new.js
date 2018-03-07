#!/usr/bin/env node
'use strict';

const { mkdirpSync, copySync, writeJsonSync } = require('fs-extra');
const vfs = require('vinyl-fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const arg = process.argv[2];
if (!arg) {
  console.log(chalk.red('peak: 缺少项目工程名称'));
} else {
  console.log(chalk.green('peak: building...'));
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'peak: select the type of development technology',
        name: 'react',
        choices: [
          {
            key: 'redux',
            name: 'react+redux',
            value: 'redux',
          },
          {
            key: 'mobx',
            name: 'react+mobx',
            value: 'mobx',
          },
        ],
      },
    ])
    .then(function(firstAnswers) {
      inquirer
        .prompt([
          {
            type: 'list',
            message: 'peak: select language ts(typescript) or js(javascript)',
            name: 'language',
            choices: [
              {
                key: 'ts',
                name: 'typescript(推荐使用typescript开发)',
                value: 'ts',
              },
              {
                key: 'js',
                name: 'javascript',
                value: 'js',
              },
            ],
          },
        ])
        .then(function(twoAnswers) {
          const dest = path.join(process.cwd(), arg);
          const boilerplates =
            twoAnswers.language === 'ts'
              ? `${firstAnswers.react}-ts`
              : firstAnswers.react;
          const cwd = path.join(__dirname, '../boilerplates/', boilerplates);
          mkdirpSync(dest);
          writeJsonSync(
            dest + '/peak.json',
            Object.assign(require(path.join(__dirname, '../peak.json')), {
              language: twoAnswers.language,
            })
          );
          copySync(path.join(__dirname, '../config'), dest + '/config', {
            overwrite: true,
          });
          copySync(path.join(__dirname, '../bin'), dest + '/bin', {
            overwrite: true,
          });
          vfs
            .src(['**/*', '!node_modules/**/*'], {
              cwd: cwd,
              cwdbase: true,
              dot: true,
            })
            .pipe(vfs.dest(dest))
            .on('end', function() {
              console.log(chalk.green('peak: building ok'));
            });
        });
    });
}
