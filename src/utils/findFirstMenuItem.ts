/**
 * @description: 查找菜单里的第一个有效菜单
 * @author: zs
 * @Date: 2020-07-12 18:55:17
 * @LastEditTime: 2020-07-12 18:55:57
 * @LastEditors: zs
 */

import { AppState } from '@ts-types/store';

export default function findFirstMenuItem(menuList: AppState['menu']) {
  let firstPathname = {}
  if (!Array.isArray(menuList) || !menuList.length) {
    return firstPathname
  }

  for (const menuitem of menuList) {
    if (menuitem.component) {
      firstPathname = menuitem;
      break;
    }
  }
  return firstPathname;
}
