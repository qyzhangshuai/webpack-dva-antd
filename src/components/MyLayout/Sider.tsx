/**
 * @description:
 * @author: zs
 * @Date: 2020-06-26 20:29:39
 * @LastEditTime: 2020-07-12 16:10:58
 * @LastEditors: zs
 */

import React, { FC } from 'react'
import { Switch, Layout } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import { MyIcon } from '@components';
import classnames from 'classnames';
import styles from './Layout.less'
import Menus from './Menu'

interface MenuItem {
  id: number;
  icon?: string;
  name: string;
  component: string;
}

interface Props {
  darkTheme: boolean;
  siderFold: boolean;
  location: Location;
  changeMenu: any;
  changeOpenKeys: any;
  navOpenKeys: string[];
  defaultOpenKeys?: string[];
  menu: MenuItem[];
  switchSider: any;
}
const { Sider } = Layout

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const MySider: FC<Props> = ({
  siderFold,
  darkTheme,
  location,
  navOpenKeys,
  defaultOpenKeys,
  changeOpenKeys,
  menu,
  switchSider,
  changeMenu,
}) => {
  const menusProps = {
    menu,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    defaultOpenKeys,
    changeMenu,
  }
  return (
    <div className={classnames(styles.page_slider, siderFold ? styles.page_slider_hidden : '')}>
      <Sider
        trigger={null}
        width="100%"
      >
        {menu.length === 0 ? null : (
          <div>
            <div className={styles.menu_header}>
              <MenuOutlined />
              <p>菜单</p>
              <div className={styles.menu_header_close} onClick={switchSider}>
                <MyIcon type="close" />
              </div>
            </div>
            <Menus {...menusProps} />
          </div>
        )}
      </Sider>
    </div>
  )
}

export default MySider
