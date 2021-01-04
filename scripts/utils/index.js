/**
 * @description: 
 * @author: zs
 * @Date: 2020-07-10 09:44:35
 * @LastEditTime: 2020-07-10 14:32:51
 * @LastEditors: zs
 */
const os = require('os');

function createNotifierCallback(severity, errors) {
  // 可以收听插件转换和优先级的错误
  // 严重性可以是'错误'或'警告'
  if (severity !== 'error') {
    return;
  }
  const error = errors[0];
  notifier.notify({
    title: "Webpack error",
    message: severity + ': ' + error.name,
    subtitle: error.file || '',
    // icon: ICON
  });
}

function hasMultipleCores() {
  try {
    return require('os').cpus().length > 1
  } catch (e) {
    return false
  }
}

function getNetworkIp() {
  let needHost = ''; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = 'localhost';
  }
  return needHost;
}

function prettyPrintHost(host) {
  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  if (isUnspecifiedHost) {
    return 'localhost';
  }
  return host
}

function newWorkUrl(isHttps, host, port) {
  return `${isHttps ? 'https' : 'http'}://${prettyPrintHost(host)}:${port}/`
}

module.exports = {
  createNotifierCallback,
  hasMultipleCores,
  getNetworkIp,
  newWorkUrl,
}