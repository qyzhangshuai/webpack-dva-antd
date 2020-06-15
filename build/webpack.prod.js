/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-06-15 12:22:48
 * @LastEditors: zs
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
module.exports = {
    mode: 'production',
    devtool: 'none',
    optimization: { // 优化项
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [ // 可以放置压缩方案
            new OptimizeCSSAssetsPlugin(), // 用了这个 js 也得手动压缩
            new TerserWebpackPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}