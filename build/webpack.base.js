/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 18:09:18
 * @LastEditTime: 2020-07-21 22:29:12
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
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin'); // 费时分析
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const postcssNormalize = require('postcss-normalize');

const paths = require('./paths')

const smw = new SpeedMeasureWebpackPlugin();

const theme = require('../theme.config') // 配置主题
const VERSION = require('../version')
const ENV = process.env.ENV;
const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

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

const cssRegex = /\.css$/;
const lessRegex = /\.less$/;

module.exports = env => {
  // env 是环境变量
  // let isDev = env.development;
  const base = {
    // 生产环境一旦发现错误，立刻停止编译
    bail: !isDev,
    entry: [
      isDev && require.resolve('react-dev-utils/webpackHotDevClient'),
      path.resolve(__dirname, "../src/index.tsx"),
    ].filter(Boolean),
    output: {
      filename: isDev ? 'js/bundle.js' : 'js/[name].[contenthash:10].js',
      chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash:10]_chunk.js', // 非入口chunk的名称
      path: path.resolve(__dirname, "../dist"),
      publicPath: publicPath
    },
    performance: {
      hints: false
    },
    module: {
      // noParse: /jquery|lodash/, // 正则表达式
      // 转化什么文件 用什么去转，使用哪些loader
      // loader 写法 [] / {} ''
      // 打包css 还需要处理一下 样式前缀

      // 解析的css的时候 就不能渲染dom
      // css 可以并行和js 一同加载 mini-css-extract-plugin
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'eslint-loader',
          enforce: 'pre', // 编译前检查
          exclude: /node_modules/, // 不检测的文件
          include: [path.resolve(__dirname, '../src')], // 要检查的目录
          options: {
            fix: true
          }
        },
        {
          oneOf: [
            { // 解析js文件 默认会调用@babel/core 
              test: /\.(js|jsx|ts|tsx)$/,
              // use: 'babel-loader',
              exclude: /node_modules/,
              use: [
                //  thread-loader需要适度使用，看编译速度再决定是否使用，本例不使用了，速度偏慢
                // isDev && {
                //   loader: 'thread-loader',
                //   options: {
                //     workers: 2 // 进程2个
                //   }
                // },
                {
                  // loader: 'babel-loader',
                  loader: require.resolve('babel-loader'), // 原先是 loader: 'babel-loader'
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
                    ],
                    // 开启babel缓存
                    // 第二次构建时，会读取之前的缓存
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: !isDev,
                  }
                }
              ].filter(Boolean)
            },

            {
              test: cssRegex,
              exclude: /src/,
              use: getStyleLoaders({
                importLoaders: 1,
              }),
              sideEffects: true,
            },
            {
              test: cssRegex,
              exclude: /node_modules/,
              use: getStyleLoaders({
                importLoaders: 2,
                modules: {  // css模块化
                  localIdentName: '[name]__[local]_[hash:base64:5]',
                },
              }),
            },
            {
              test: lessRegex,
              exclude: /src/,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                },
                {
                  // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。配置antd主题
                  modifyVars: theme(),
                  javascriptEnabled: true, // 开启配置主题
                }
              ),
              sideEffects: true,
            },
            {
              test: lessRegex,
              exclude: /node_modules/,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]__[local]_[hash:base64:5]',
                  },
                },
                {
                  modifyVars: theme(),
                  javascriptEnabled: true,
                }
              ),
            },
            { // 图标的转化
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              loader: 'file-loader',
              options: {
                name: "image/[contentHash].[ext]",
              }
            },
            { // 图片的转化
              test: /\.(jpe?g|png|gif|svg|bmp)$/,
              use: {
                loader: 'url-loader',
                options: {
                  name: "image/[contentHash].[ext]",
                  limit: imageInlineSizeLimit
                }
              }
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
        '@assets': `${__dirname}/../src/assets`,
        'themes': `${__dirname}/../src/themes`,
      },
      extensions: ['.tsx', '.ts', ".js", '.jsx'],
      plugins: [
        PnpWebpackPlugin,
        // 防止用户从src/（或node_modules/）外部导入文件。
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    resolveLoader: {
      plugins: [
        // 也与即插即用有关，但这次它告诉webpack加载加载程序从当前包中。
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },

    plugins: [
      !isDev && new MiniCssExtractPlugin({ // 如果是开发模式就不要使用抽离样式的插件
        filename: 'css/[name].[contenthash:10].css',
        chunkFilename: 'css/[id].[contenthash:10].css',
        ignoreOrder: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
        filename: "index.html",
        inject: true,
        minify: !isDev && { // 代表开发环境不要压缩，如果是生产环境则压缩
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      // 打包文件分析工具
      // !isDev && new BundleAnalyzerPlugin(),
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
      // 添加 进度条 二选一
      // new ProgressBarPlugin({
      //   complete: '.',  //
      //   width: 50,
      //   format: 'build [:bar] ' + chalk.green.bold(':percent') + '(:elapsed seconds)',
      //   clear: false
      // }),
      // 添加 进度条
      new WebpackBar(),
      // 是在热加载时直接返回更新文件名，而不是文件的id。
      new webpack.NamedModulesPlugin(),
      //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 此Webpack插件强制所有必需模块的完整路径与磁盘上实际路径的确切大小写相匹配
      isDev && new CaseSensitivePathsPlugin(),
      // 如果您需要一个丢失的模块，然后使用“npm install”命令，那么仍然需要
      // 重新启动Web包的开发服务器以发现它。这个插件
      // 使发现自动进行，因此您不必重新启动。
      isDev && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      // 这为模块未发现错误提供了必要的上下文，例如请求资源。
      new ModuleNotFoundPlugin(paths.appPath),
    ].filter(Boolean)
  };
  if (isDev) {
    return merge(base, dev);
    // return smw.wrap(merge(base, dev)); 
  } else {
    return merge(base, prod);
    // return smw.wrap(merge(base, prod));
  }
};

const getStyleLoaders = (cssOptions, preProcessor = {}) => {
  const loaders = [
    isDev ? "style-loader" : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
      }
    },
    {
      loader: "css-loader",
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // 外部CSS导入工作所必需的
        ident: 'postcss',
        plugins: () => [
          // 修复flex相关的bug
          require('postcss-flexbugs-fixes'),
          // PostCSS Preset Env使您可以将现代CSS转换为大多数浏览器可以理解的内容，并根据目标浏览器或运行时环境确定所需的polyfill。
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
      },
    },

  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: "less-loader",
        options: {
          lessOptions: preProcessor,
        }
      }
    );
  }
  return loaders;
};