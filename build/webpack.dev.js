/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-06-13 20:06:51
 * @LastEditors: zs
 */
const path = require('path');
const apiMocker = require('mocker-api')
const fs = require('fs')
const { mockApiToApp } = require('mockjs-server-cli');
const mockData = require('../mock.config.js');

const host = '127.0.0.1';
const port = '4000';

module.exports = {
	mode: 'development',
	devtool: 'eval-cheap-module-souce-map',
	watchOptions: {
		ignored: /node_modules/
	},
	devServer: { // 开发服务的配置 
		host,
		port,
		compress: true,// gzip 可以提升返回页面的速度
		watchContentBase: true, // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
		contentBase: path.resolve(__dirname, '../dist'), // webpack启动服务会在dist目录下
		// overlay: false,
		overlay: {
			warnings: true,
			errors: true
		},
		hot: true,
		historyApiFallback: true,

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