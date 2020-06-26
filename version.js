/**
 * @description: 版本信息
 * @author: zs
 * @Date: 2020-06-26 15:51:49
 * @LastEditTime: 2020-06-26 16:39:33
 * @LastEditors: zs
 */
const moment = require('moment');

const VERSION = moment(new Date()).format('YYYY-MM-DD HH:mm');

module.exports = VERSION;
