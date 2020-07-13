/**
 * @description: 处理mock
 * @author: zs
 * @Date: 2020-06-13 16:57:28
 * @LastEditTime: 2020-07-13 12:53:08
 * @LastEditors: zs
 */
const fs = require('fs');
const path = require('path');

const mock = {};
fs.readdirSync(path.join(__dirname, './mock')).forEach(file => {
  if (file[0] !== '_') {
    Object.assign(mock, require('./mock/' + file));
  }
})
module.exports = mock;
