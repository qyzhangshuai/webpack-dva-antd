/**
 * @description: 根据菜单，生成默认一级菜单展开keys
 * @author: zs
 * @Date: 2020-07-12 18:49:25
 * @LastEditTime: 2020-07-12 18:50:37
 * @LastEditors: zs
 */

import { AppState } from '@ts-types/store';

export default function getDefaultOpenKeys(menuList: AppState['menu']): string[] {
  const defaultOpenKeys = []
  if (!Array.isArray(menuList) || !menuList.length) {
    return defaultOpenKeys
  }

  for (const menuitem of menuList) {
    if (!menuitem.pid) {
      defaultOpenKeys.push(`${menuitem.id}`)
    }
  }
  return defaultOpenKeys;
}
