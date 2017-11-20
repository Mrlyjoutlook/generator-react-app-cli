const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function getName(name){
  return name.slice(0, name.indexOf('.js'))
}

function getEntry(way = '', array = []) {
  if (fs.existsSync(path.resolve(__dirname, way))) {
    return fs.readdirSync(path.resolve(__dirname, way))
      .filter(filename =>
        /\.(js|jsx)$/.test(filename) && filename.indexOf('registerServiceWorker') === -1
      )
      .reduce((pre,cur)=>{
        const name=getName(cur);
        pre[name] = [...array, path.resolve(__dirname, way + '/' + cur)];
        return pre;
      }, {});
  } else {
    console.log(chalk.red('path is not exit!'));
  }
}

function matchKey(keys = [], key = '') {
  return keys.filter((item) => item.indexOf(key) !== -1);
}

module.exports = {
  getEntry,
  matchKey,
}
