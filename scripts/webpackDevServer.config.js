/**
 * @description
 * @author ronffy
 * @Date 2020-07-22 14:49:49
 * @LastEditTime: 2020-07-25 18:16:54
 * @LastEditors: zs
 */
const path = require('path');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');

module.exports = function (host, port, isHttps) {
  // 开发服务的配置
  return {
    host,
    https: isHttps,
    compress: true, // gzip 可以提升返回页面的速度
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
    injectClient: false,

    // progress: true, //显示打包的进度
    historyApiFallback: true, // 在devServer里面有个historyApiFallback的属性，是用于如果找不到界面就返回默认首页，上线时需要使用nginx
    disableHostCheck: true, //  新增该配置项
    // clientLogLevel: 'none',
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
      '/proxy': {
        target: `http://${host}:${port}`,
        changeOrigin: true,
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          '^/proxy': ''
        }
      },
      bypass(req) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html'
        }
      }
    },
    before(app, server) {
      // Keep `evalSourceMapMiddleware` and `errorOverlayMiddleware`
      // middlewares before `redirectServedPath` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());

      // if (fs.existsSync(paths.proxySetup)) {
      //   // This registers user provided middleware for proxy reasons
      //   require(paths.proxySetup)(app);
      // }
    },
    // after(app) {
    //   // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
    //   app.use(redirectServedPath(paths.publicUrlOrPath));

    //   // This service worker file is effectively a 'no-op' that will reset any
    //   // previous service worker registered for the same host:port combination.
    //   // We do this in development to avoid hitting the production cache if
    //   // it used the same host and port.
    //   // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
    //   app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    // },

  }
}
