/**
 * @description: 
 * @author: zs
 * @Date: 2020-07-13 10:47:55
 * @LastEditTime: 2020-07-15 11:22:11
 * @LastEditors: zs
 */
// const { resolve } = require('path');
// const { realpathSync } = require('fs');

// function resolveOwn(relativePath) {
//   return resolve(__dirname, relativePath);
// }

// module.exports = function (cwd = process.cwd()) {
//   const appDirectory = realpathSync(cwd);

//   function resolveApp(relativePath) {
//     return resolve(appDirectory, relativePath);
//   }

//   return {
//     appBuild: resolveApp('dist'),
//     appPublic: resolveApp('public'),
//     appPackageJson: resolveApp('package.json'),
//     appSrc: resolveApp('src'),
//     appNodeModules: resolveApp('node_modules'),
//     ownNodeModules: resolveOwn('../node_modules'),
//     resolveApp,
//     appDirectory,
//   };
// }

'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
// const publicUrlOrPath = getPublicUrlOrPath(
//   process.env.NODE_ENV === 'development',
//   require(resolveApp('package.json')).homepage,
//   process.env.PUBLIC_URL
// );

// console.log('publicUrlOrPath', publicUrlOrPath)

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

console.log(resolveApp('./mock/'))
// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  configFile: resolveApp('./mock.config.js'),
  mockDir: resolveApp('./mock/'),
  // publicUrlOrPath,
};

// module.exports.moduleFileExtensions = moduleFileExtensions;

