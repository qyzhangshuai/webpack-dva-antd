/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 21:11:59
 * @LastEditTime: 2020-06-13 21:15:38
 * @LastEditors: zs
 */

let mockApiPrefix = '/api/v1'

let apiPrefix;
let exportPrefix; //导出excel

switch (process.env.ENV) {
  case 'production':
    apiPrefix = 'https://production'
    mockApiPrefix = apiPrefix
    exportPrefix = apiPrefix
    break;

  case 'test':
    apiPrefix = 'https://test'
    mockApiPrefix = apiPrefix
    exportPrefix = apiPrefix
    break;

  case 'development':
    apiPrefix = 'https://development'
    break;

  default:
    break;
}

export default {
  apiPrefix,
  mockApiPrefix,
  CORS: [],
  login: `${apiPrefix}/development/auth/login`,
  logout: `${apiPrefix}/user/logout`,

}
