/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 13:58:44
 * @LastEditTime: 2020-06-13 22:28:23
 * @LastEditors: zs
 */
import request from '@utils/request';

export function query() {
  return request('/api/users');
}
