/**
 * @description:
 * @author: zs
 * @Date: 2020-06-13 21:09:28
 * @LastEditTime: 2020-06-26 17:07:52
 * @LastEditors: zs
 */

import apis from './apis'

// eslint-disable-next-line prefer-destructuring
const ENV = process.env.ENV;
console.info('环境:', ENV);
console.info('版本:', process.env.VERSION);

const name = 'webpack-dva'
const prefix = 'webpack-dva'
// 路由相关
const defaultPageInfo = {
  router: '/mini/followStudent/withoutWechat',
  name: '默认路由',
}
const loginRouter = '/mini/login'
// 不在 menu 里的页面，不需要权限就可以看的页面，有菜单和header布局
const openPages = [
  '/mini/operationTeam/operationDataBoard',
]
// 不在 menu 里的页面，不需要权限就可以看的页面，只有header布局
const openPagesOnlyHeader = [
  '/mini/user/center',
]
// 不需要权限就可以访问的全屏页面
const openFullscreenPages = ['/mini/login']

export {
  apis,
  ENV,
  name,
  prefix,
  defaultPageInfo,
  loginRouter,
  openPages,
  openPagesOnlyHeader,
  openFullscreenPages,
}
