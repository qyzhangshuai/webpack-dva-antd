/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-12 14:58:27
 * @LastEditTime: 2020-06-12 15:02:36
 * @LastEditors: zs
 */
const path = require('path');
const DLLPlugin = require('webpack').DllPlugin;
// 需要产生一个缓存列表
module.exports = {
  mode: 'development',
  // entry: './src/calc.js',
  entry: ['react', 'react-dom'],

  output: {
    library: 'react', // 打包后接收自执行函数的名字叫做calc
    // libraryTarget: 'commonjs2', // 默认使用的是var，还有umd commonjs等等; commonjs2 表示moudule.exports
    filename: 'react.dll.js',
    path: path.resolve(__dirname, '../dll')
  },
  plugins: [
    new DLLPlugin({
      name: 'react',
      path: path.resolve(__dirname, '../dll/manifest.json') // 缓存列表
    })
  ]
}

// 目的是为了将calc打包成node可以识别的模块
// dll 可以用作生产环境

// 我本地使用了import React 语法 需要先去 manifest.json查找，找到后会加载对应库的名字，可能会引用某个模块，回去react.dll.js文件中查找