/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 12:52:45
 * @LastEditTime: 2020-06-27 18:23:52
 * @LastEditors: zs
 */
/* global window */
/* global document */
import React, {
  FC, ReactNode, CSSProperties, useEffect, useMemo,
} from 'react';
import NProgress from 'nprogress';
import { pathToRegexp } from 'path-to-regexp';
import { MapStateToProps } from 'react-redux';
import { connect } from 'dva';
import { Loader, MyLayout } from '@components';
import { BackTop, Layout } from 'antd';
import classnames from 'classnames';
import { withRouter } from 'dva/router';
import { RootState } from '@ts-types/store';
import { Dispatch } from '@ts-types/dva';
import * as config from '@config';
import logout from '@utils/logout';
import Error from './error';
import '../themes/index.less';
import styles from './app.less';

console.log('styles', styles);
interface DispatchProps {
  dispatch: Dispatch;
}

interface StateProps {
  app: RootState['app'];
  loading: RootState['loading'];
}

interface RouterProps {
  location: Location;
}

interface OwnProps {
  children: ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps & RouterProps;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const { Content } = Layout;
const { Header } = MyLayout;

const {
  prefix, openPages, openFullscreenPages, openPagesOnlyHeader,
} = config;

let lastHref;

const App: FC<Props> = ({
  children, dispatch, app, loading, location,
}) => {
  const {
    user,
    menu,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
  } = useMemo(() => app, [app]);

  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // pathToRegexp("").test("/") => true
  // 表示只要component为空，那么就代表有权限
  const hasPermission = menu.filter((item) => pathToRegexp(item.component || '').test(pathname)).length;

  const { href } = window.location;
  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    isNavbar, // popOver的时候
    navOpenKeys,
    menuPopoverVisible, // popOver的显示于隐藏
    // 左侧菜单显不显示
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    // 头部的右侧的登出和设置密码
    onClickMenu({ key }) {
      switch (key) {
        case 'logout':
          logout();
          break;
        case 'usercenter':
          dispatch({
            type: 'app/routerToPage',
            payload: '/mini/user/center',
          });
          break;

        default:
          break;
      }
    },
    siderFold, // 菜单折叠
    // 左右折叠
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    // 菜单的打开
    changeOpenKeys(openKeys: string[]) {
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: openKeys },
      });
    },
  };

  const initLoading = useMemo(() => loading.effects['app/initialize'], [loading]);

  if (openFullscreenPages.includes(pathname)) {
    return (
      <div className={styles.app}>
        <Loader fullScreen spinning={initLoading} />
        {children}
      </div>
    );
  }

  if (openPagesOnlyHeader.includes(pathname)) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Loader fullScreen spinning={initLoading} />
        <Header {...headerProps} noBar />
        <Content style={{ height: '100%' }}>{children}</Content>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Loader fullScreen spinning={initLoading} />
      {/* <Layout className={classnames({ [styles.dark]: darkTheme, [styles.light]: !darkTheme })}> */}
      <Layout>
        {/* {!isNavbar && <MyLayout.Sider {...siderProps} />} */}

        <Layout
          className={styles.app}
          id="mainContainer"
        >
          <BackTop target={() => document.getElementById('mainContainer')} />
          <Header {...headerProps} />
          <Content>
            {
              hasPermission || (user.id && openPages.includes(pathname))
                ? children
                : (
                  // 用户信息未请求成功时，先显示 loading
                  initLoading
                    ? null
                    : <Error />
                )
            }
          </Content>
          {/* <Footer >
            {config.footerText}
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  )
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = ({
  app,
  loading,
}: RootState) => ({
  app,
  loading,
});

export default withRouter(connect(mapStateToProps)(App));
