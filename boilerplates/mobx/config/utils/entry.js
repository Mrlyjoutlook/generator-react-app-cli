const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function getName(name, ts = false){
  return !ts ?
    name.slice(0, name.indexOf('.js')) :
    name.indexOf('.ts') ?
      name.slice(0, name.indexOf('.ts') ) :
      name.slice(0, name.indexOf('.tsx') );
}

function getEntry(way = '', array = [], ts = false) {
  const reg = !ts ? /\.(js|jsx)$/ : /\.(ts|tsx)$/;
  if (fs.existsSync(path.resolve(__dirname, way))) {
    return fs.readdirSync(path.resolve(__dirname, way))
      .filter(filename =>
        reg.test(filename) && filename.indexOf('registerServiceWorker') === -1 && filename.indexOf('.d.ts') == -1
      )
      .reduce((pre,cur)=>{
        const name=getName(cur, ts);
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
