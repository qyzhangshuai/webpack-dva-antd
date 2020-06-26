/**
 * @description:
 * @author: zs
 * @Date: 2020-06-15 10:06:49
 * @LastEditTime: 2020-06-26 17:14:37
 * @LastEditors: zs
 */
/* global window */
/* global document */
import React, {
  FC, ReactNode, CSSProperties, useEffect,
} from 'react';
import NProgress from 'nprogress';
import pathToRegexp from 'path-to-regexp';
import { MapStateToProps } from 'react-redux';
import { connect } from 'dva';
import { Loader, MyLayout } from '@components';
import { BackTop, Layout } from 'antd';
import classnames from 'classnames';
// import { ENV } from '@config';
import { withRouter } from 'dva/router';
import { RootState } from '@ts-types/store';
import { Dispatch } from '@ts-types/dva';
import { ENV } from '@config'
// import { logout } from '@utils';
import Error from './error';
import styles from '../themes/index.less';
import './app.less';

console.log('config', ENV);
interface DispatchProps {
  dispatch: Dispatch
}

interface StateProps {
  app: RootState['app']
  loading: RootState['loading']
}

interface RouterProps {
  location: Location
}

interface OwnProps {
  children: ReactNode
}

type Props = StateProps & DispatchProps & OwnProps & RouterProps;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const { Content } = Layout;
// const {
//   prefix, openPages, openFullscreenPages, openPagesOnlyHeader,
// } = config;

let lastHref;

const App: FC<Props> = ({
  children, dispatch, app, loading, location,
}) => {
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

  const { href } = window.location;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  return (
    <div className="app123456">
      {children}

    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState> = ({
  app,
  loading,
}: RootState) => ({
  app,
  loading,
});

export default withRouter(connect(mapStateToProps)(App));
