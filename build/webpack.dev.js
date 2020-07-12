/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-07-12 19:55:09
 * @LastEditors: zs
 */
// const DllReferencePlugin = require('webpack').DllReferencePlugin;
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const fs = require('fs')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const chalk = require('chalk')
const { mockApiToApp } = require('mockjs-server-cli');
const mockData = require('../mock.config.js');
const { createNotifierCallback, getNetworkIp, newWorkUrl } = require('./utils')

const isHttps = false
const notifyOnErrors = true
const host = 'localhost';
let port = '4009';

const PORT = process.env.PORT;
if (PORT) {
	port = PORT
}

module.exports = {
	mode: 'development',
	devtool: 'source-map',
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
				messages: [
					`App running at:`,
					`- Local:   ${chalk.cyan(newWorkUrl(isHttps, host, port))}`,
					`- Network: ${chalk.cyan(newWorkUrl(isHttps, getNetworkIp(), port))}`,
				],
				notes: [
					'Note that the development build is not optimized.',
					`To create a production build, run ${chalk.cyan('npm run build')}`,
				]
			},
			//  运行错误 
			// onErrors: notifyOnErrors ? createNotifierCallback : undefined,
			//是否每次编译之间清除控制台
			//默认为true
			// clearConsole: true,
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
		overlay: false,
		// overlay: {
		// 	warnings: false,
		// 	errors: true
		// },
		// 除了一些基本启动信息以外，其他内容都不要显示
		quiet: true,
		hot: true,

		// Use 'ws' instead of 'sockjs-node' on server since we're using native
		// websockets in `webpackHotDevClient`.
		transportMode: 'ws',

		// progress: true, //显示打包的进度
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

