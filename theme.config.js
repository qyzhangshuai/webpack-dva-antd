/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-25 17:08:43
 * @LastEditTime: 2020-06-25 17:28:46
 * @LastEditors: zs
 */
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

module.exports = () => {
  const themePath = path.join(__dirname, './src/themes/default.less');
  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}
