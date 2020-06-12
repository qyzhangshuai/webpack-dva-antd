/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-06-11 11:36:12
 * @LastEditors: zs
 */
const path = require('path');
module.exports = {
    mode:'development',
    devtool: 'eval-cheap-module-souce-map',
    devServer:{ // 开发服务的配置 
        port:4000,
        compress:true,// gzip 可以提升返回页面的速度
        contentBase:path.resolve(__dirname,'../dist') // webpack启动服务会在dist目录下
    }
}