/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-07-10 09:46:05
 * @LastEditors: zs
 */
// const DllReferencePlugin = require('webpack').DllReferencePlugin;
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const fs = require('fs')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const { mockApiToApp } = require('mockjs-server-cli');
const mockData = require('../mock.config.js');
const { createNotifierCallback } = require('./utils')
const host = '127.0.0.1';
const port = '4009';
const isHttps = false
const notifyOnErrors = true

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	watchOptions: {
		ignored: /node_modules/
	},
	plugins: [
		// // 先到这里面进行查找
		// new DllReferencePlugin({
		// 	// 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
		// 	context: path.resolve(__dirname, '../'),
		// 	manifest: path.resolve(__dirname, '../dll/manifest.json')
		// }),
		// // 引入库里面打包好的内容，就是react和react-dom
		// new AddAssetHtmlPlugin({
		// 	filepath: path.resolve(__dirname, '../dll/react.dll.js')
		// }),

		// 设置热更新
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`Your application is running here: ${isHttps ? 'https' : 'http'}://${host}:${port}`],
				// notes:['有些附加说明要在成功编辑时显示']
			},
			//  运行错误
			onErrors: notifyOnErrors ? createNotifierCallback : undefined,
			//是否每次编译之间清除控制台
			//默认为true
			clearConsole: true,
		}),

	],
	devServer: { // 开发服务的配置 
		host,
		https: isHttps,
		port,
		open: true,
		compress: true,// gzip 可以提升返回页面的速度
		watchContentBase: true, // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
		contentBase: path.resolve(__dirname, '../dist'), // webpack启动服务会在dist目录下
		// overlay: false,
		overlay: {
			warnings: true,
			errors: true
		},
		// 除了一些基本启动信息以外，其他内容都不要显示
		// quiet: true,
		hot: true,
		historyApiFallback: true, // 在devServer里面有个historyApiFallback的属性，是用于如果找不到界面就返回默认首页，上线时需要使用nginx
		disableHostCheck: true, //  新增该配置项
		proxy: {
			// 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
			'/api': {
				target: `http://${host}:${port}`,
				changeOrigin: true,
				// 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
				pathRewrite: {
					'^/api': ''
				}
			},
			bypass(req) {
				if (req.headers.accept.indexOf('html') !== -1) {
					return '/index.html'
				}
			}
		},
		before(app, server) {
			mockApiToApp(app, mockData)
		}

	}
}

