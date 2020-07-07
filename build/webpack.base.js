/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-07-07 22:32:15
 * @LastEditors: zs
 */
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin');
const glob = require('glob'); // 主要功能就是查找匹配的文件
const webpack = require('webpack')

const thems = require('../theme.config') // 配置主题
const VERSION = require('../version')

const ENV = process.env.ENV;

let publicPath = '';
let isDev = false
switch (ENV) {
  case 'production':
  case 'pre':
    isDev = false
    publicPath = '/'
    break;
  case 'test':
    isDev = false
    publicPath = 'CDN';
    break;
  case 'development':
    isDev = true
    publicPath = '/';
    break;
  default:
    break;
}


module.exports = env => {
  // env 是环境变量
  // let isDev = env.development;
  const base = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, "../dist"),
      publicPath: publicPath
    },
    module: {
      // 转化什么文件 用什么去转，使用哪些loader
      // loader 写法 [] / {} ''
      // 打包css 还需要处理一下 样式前缀

      // 解析的css的时候 就不能渲染dom
      // css 可以并行和js 一同加载 mini-css-extract-plugin
      rules: [
        // {
        //   test: /\.(js|jsx|ts|tsx)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre', // 编译前检查
        //   exclude: /node_modules/, // 不检测的文件
        //   include: [path.resolve(__dirname, '../src')], // 要检查的目录
        //   options: {
        //     fix: true
        //   }
        // },
        {
          oneOf: [
            { // 解析js文件 默认会调用@babel/core 
              test: /\.(js|jsx|ts|tsx|ejs)$/,
              // use: 'babel-loader',
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    "presets": [
                      [
                        "@babel/preset-env",
                        {
                          "useBuiltIns": "entry",
                          // "useBuiltIns": "usage",
                          "corejs": 3,
                        },
                      ],
                      "@babel/preset-react",
                      "@babel/preset-typescript",
                    ],
                    "plugins": [
                      [
                        "import",
                        {
                          "libraryName": "antd",
                          "libraryDirectory": "lib",
                          "style": true
                        }
                      ],
                      [
                        "@babel/plugin-proposal-decorators",
                        {
                          "legacy": true
                        }
                      ],
                      [
                        "@babel/plugin-proposal-class-properties",
                        {
                          "loose": true
                        }
                      ],
                      "@babel/plugin-transform-runtime",

                    ]
                  }
                }
              ]
            },
            {
              test: /\.(less|css)$/,
              exclude: /node_modules/, // 对除了node_modules外的文件进行模块化
              use: [ // 是不是开发环境 如果是就用style-loader
                isDev ? "style-loader" : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  }
                },
                {
                  loader: "css-loader",
                  options: {
                    // 给loader传递参数
                    // 如果css文件引入其他文件@import
                    importLoaders: 2,
                    modules: {
                      localIdentName: '[name]__[local]_[hash:base64:5]',
                    }, // css模块化
                    // sourceMap: true
                  }
                },
                "postcss-loader",
                {
                  loader: "less-loader",
                  options: {
                    lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。配置antd主题
                      modifyVars: thems(),
                      javascriptEnabled: true, // 开启配置主题
                    },
                  }
                }
              ]
            },
            {
              test: /\.(less|css)$/,
              exclude: /src/, // 这是为了antd的，不让antd进行模块化
              use: [
                isDev ? "style-loader" : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  }
                },
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2,
                  }
                },
                "postcss-loader",
                {
                  loader: "less-loader",
                  options: {
                    lessOptions: {
                      modifyVars: thems(),
                      javascriptEnabled: true,
                    }
                  }
                }
              ]
            },

            { // 图标的转化
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: 'file-loader'
            },
            { // 图片的转化
              test: /\.(jpe?g|png|gif|svg)$/,
              use: {
                loader: 'url-loader',
                // 如果大于100k的图片 会使用file-loader
                options: {
                  name: "image/[contentHash].[ext]",
                  limit: 1024
                }
              }
              // file-loader 默认的功能是拷贝的作用
              // 我希望当前比较小的图片可以转化成 base64 比以前大，好处就是不用发送http请求
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@components': `${__dirname}/../src/components`,
        '@models': `${__dirname}/../src/models`,
        '@services': `${__dirname}/../src/services`,
        '@config': `${__dirname}/../src/config`,
        '@constant': `${__dirname}/../src/constant`,
        '@routes': `${__dirname}/../src/routes`,
        '@utils': `${__dirname}/../src/utils`,
        '@hooks': `${__dirname}/../src/hooks`,
        '@ts-types': `${__dirname}/../src/ts-types`,
        '@enums': `${__dirname}/../src/utils/enums`,
        'themes': `${__dirname}/../src/themes`,
      },
      extensions: ['.tsx', '.ts', ".js", '.jsx'],
    },
    plugins: [
      // 在每次打包之前 先清除dist目录下的文件
      !isDev && new MiniCssExtractPlugin({ // 如果是开发模式就不要使用抽离样式的插件
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[id].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
        filename: "index.html",
        inject: true,
        minify: !isDev && { // 代表开发环境不要压缩，如果是生产环境则压缩
          removeAttributeQuotes: true, // 删除属性双引号
          collapseWhitespace: true
        }
      }),
      // new PurgeCssWebpackPlugin({
      //   paths: glob.sync("./src/**/*", {
      //     nodir: true
      //   })
      // }),
      // 这个插件是用来定义全局变量的
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(ENV),
        'process.env.VERSION': JSON.stringify(VERSION),
      }),
      new webpack.NamedModulesPlugin(),

    ].filter(Boolean)
  };
  // 函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge(base, dev); // 循环后面的配置 定义到前面去
  } else {
    return merge(base, prod);
  }
};