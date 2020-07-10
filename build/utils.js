/**
 * @description: 
 * @author: zs
 * @Date: 2020-07-10 09:44:35
 * @LastEditTime: 2020-07-10 09:45:10
 * @LastEditors: zs
 */
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

module.exports = {
  createNotifierCallback,
}