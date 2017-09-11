#!/usr/bin/env node

const { mkdirpSync, moveSync } = require('fs-extra');
const vfs = require('vinyl-fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const arg = process.argv[2];
if (!arg) {
    console.log(chalk.red('peak: 缺少项目工程名称'))
} else {
    console.log(chalk.green('peak: building...'));
    inquirer.prompt([{
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
                key: 'mbox',
                name: 'react+mbox',
                value: 'mbox',
            },
        ],
    },
    ]).then(function (firstAnswers) {
        console.log(firstAnswers);
        const dest = path.join(process.cwd(), arg);
        const cwd = path.join(__dirname, '../boilerplates/', firstAnswers.react);
        mkdirpSync(dest);
        moveSync(path.join(__dirname, '../peak.json'), dest, { overwrite: true });
        moveSync(path.join(__dirname, '../config'), dest, { overwrite: true });
        moveSync(path.join(__dirname, '../bin'), dest, { overwrite: true });
        vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
        .pipe(vfs.dest(dest))
        .on('end', function() {
            console.log(chalk.green('peak: building ok'))
        });
    });
}
