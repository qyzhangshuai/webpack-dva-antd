/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 16:57:28
 * @LastEditTime: 2020-06-13 18:26:51
 * @LastEditors: zs
 */
const fs = require('fs');
const path = require('path');

let mock = {};
fs.readdirSync(path.join(__dirname, './mock')).forEach(file => {
  if (file[0] !== '_') {
    Object.assign(mock, require('./mock/' + file));
  }
})

module.exports = mock;