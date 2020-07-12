/**
 * @description: 菜单
 * @author: zs
 * @Date: 2020-06-28 21:42:14
 * @LastEditTime: 2020-07-12 18:43:12
 * @LastEditors: zs
 */
import React, { FC } from 'react'
import { Menu, Badge } from 'antd';
import { Link } from 'react-router-dom'
import { arrayToTree, queryArray } from '@utils'
import { pathToRegexp } from 'path-to-regexp'
import { MyIcon } from '@components';

interface MenuItem {
  id: number
  name: string
  icon?: string
  component?: string
  pid?: number
  dot?: boolean
}

interface TreeMenuItem extends MenuItem {
  children?: TreeMenuItem[]
}

interface Props {
  darkTheme?: boolean
  navOpenKeys: string[]
  defaultOpenKeys?: string[]
  changeOpenKeys: (...args: any[]) => void
  menu: MenuItem[]
  location: Location
  changeMenu?: () => void
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Menus: FC<Props> = ({
  darkTheme,
  navOpenKeys,
  changeOpenKeys,
  defaultOpenKeys,
  menu,
  location,
  changeMenu = () => ({}),
}) => {
  // 生成树状
  const menuTree: TreeMenuItem[] = arrayToTree(menu.filter(_ => _.pid !== -1), 'id', 'pid')
  const levelMap = {} // 这个作用：收集children存在的 {id:pid}
  // 递归生成菜单
  function getMenus<T extends TreeMenuItem[]>(menuTreeN: T) {
    return menuTreeN.map((item) => {
      if (item.children) {
        if (item.pid) {
          levelMap[item.id] = item.pid
        }
        return (
          <Menu.SubMenu
            key={item.id}
            title={(
              <span>
                {item.icon && <MyIcon type={item.icon} />}
                {item.name}
              </span>
            )}
          >
            {getMenus(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.component || '#'} onClick={changeMenu}>
            {item.icon && <MyIcon type={item.icon} />}
            {item.name}
          </Link>
        </Menu.Item>
      );
    });
  }

  const menuItems = getMenus(menuTree);
  // 保持选中
  const getAncestorKeys = (key) => {
    const map = {}
    const getParent = (index) => {
      // 得到该父级的id
      const result = [String(levelMap[index])]
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0])
      }
      return result
    }
    Object.keys(levelMap).forEach(index => {
      map[index] = getParent(index)
    })
    // for (const index in levelMap) {
    //   if ({}.hasOwnProperty.call(levelMap, index)) {
    //     map[index] = getParent(index)
    //   }
    // }
    return map[key] || []
  }

  const onOpenChange = (openKeys) => {
    console.log('open', openKeys)
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  const menuProps = {
    onOpenChange,
    // openKeys: navOpenKeys,
    defaultOpenKeys, // 产品需求，默认所有菜单都展开
  }

  // 寻找选中路由
  let currentMenu: MenuItem
  let defaultSelectedKeys: string[]
  // for (const item of menu) {
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    if (item.component && pathToRegexp(item.component).exec(location.pathname)) {
      currentMenu = item
      break
    }
  }
  function getPathArray<T>(array: T[], current: T, pid: string, id: string) {
    const result = [String(current[id])]
    const getPath = (item: T) => {
      if (item && item[pid]) {
        result.unshift(String(item[pid]))
        getPath(queryArray(array, item[pid], id))
      }
    }
    getPath(current)
    return result
  }
  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menu, currentMenu, 'pid', 'id')
  }

  if (!defaultSelectedKeys) {
    defaultSelectedKeys = ['1']
  }

  return (
    <Menu
      {...menuProps}
      mode="inline"
      theme={darkTheme ? 'dark' : 'light'}
      selectedKeys={defaultSelectedKeys}
    >
      {menuItems}
    </Menu>
  )
}

export default Menus
