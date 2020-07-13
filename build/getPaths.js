/**
 * @description: 
 * @author: zs
 * @Date: 2020-07-13 10:47:55
 * @LastEditTime: 2020-07-13 11:09:57
 * @LastEditors: zs
 */
const { resolve } = require('path');
const { realpathSync } = require('fs');

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

module.exports = function (cwd) {
  const appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('../node_modules'),
    resolveApp,
    appDirectory,
  };
}
