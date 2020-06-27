/**
 * @description: logout 登出方法,不需要接口退出，直接清除 token 就好
 * @author: zs
 * @Date: 2020-06-27 16:49:48
 * @LastEditTime: 2020-06-27 18:03:23
 * @LastEditors: zs
 */

import { prefix, loginRouter } from '@config';
import storage from './storage';

export default function logout() {
  storage.removeItem(`${prefix}-token`);
  window.location.href = `${window.location.origin}${loginRouter}`
}
