import React, { FC } from 'react'
import { Menu, Popover, Layout } from 'antd'
import { MenuOutlined, AppstoreOutlined, DownOutlined } from '@ant-design/icons'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

interface MenuItem {
  id: number;
  icon?: string;
  name: string;
  component: string;
  pid?: number;
}

interface Props {
  noBar?: boolean // 这个表示没有显示菜单的那个按钮
  siderFold?: boolean
  isNavbar?: boolean
  menuPopoverVisible?: boolean
  user: any
  switchSider: () => void
  switchMenuPopover: () => void
  onClickMenu: (e: { key: string | number }) => void
  location: Location
  navOpenKeys: string[]
  changeOpenKeys: (openKeys: string[]) => void
  menu: MenuItem[]

}

const Header: FC<Props> = ({
  user,
  switchSider,
  siderFold,
  isNavbar,
  noBar,
  menuPopoverVisible,
  location,
  switchMenuPopover,
  navOpenKeys,
  changeOpenKeys,
  menu,
  onClickMenu,
}) => {
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  return (
    <Layout.Header className={styles.header}>
      {
        noBar
          ? null
          : (
            isNavbar
              ? (
                <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
                  <div className={styles.button}>
                    <AppstoreOutlined />
                  </div>
                </Popover>
              )
              : (
                <div
                  className={styles.button}
                  onClick={switchSider}
                >
                  <MenuOutlined />
                </div>
              )
          )
      }
      <div className={styles.header_logo}>
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=388611016,4041755354&fm=26&gp=0.jpg" alt="" />
      </div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={onClickMenu}>
          <SubMenu
            popupClassName={styles.submenu}
            title={(
              <p className={styles.header_userinfo}>
                <span className={styles.header_userinfo_icon} />
                <span className={styles.header_userinfo_name}>{user.username}</span>
                <DownOutlined />
              </p>
            )}
          >
            <Menu.Item key="usercenter">
              修改密码
            </Menu.Item>
            <Menu.Item key="logout">
              登出
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

export default Header
