const path = require('path');
const { expect } = require('chai');
const execa = require('execa');

const n = path.join(__dirname, '../command/new.js');

describe('generator-react-app-cli', () => {
  describe('peak new myapp', () => {
    // let result, files;
    // 创建项目
    before(() => {
      execa(n, ['myapp'])
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    })

    it('create a project when running command', () => {
      // expect(files)
    });
  })
});
