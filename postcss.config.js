/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:08:51
 * @LastEditTime: 2020-06-12 14:57:36
 * @LastEditors: zs
 */
const path = require('path');
const purgecss = require('@fullhuman/postcss-purgecss')
const glob = require('glob'); // 主要功能就是查找匹配的文件
// 默认自动添加添加前缀
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}