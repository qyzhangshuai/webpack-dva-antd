/* global window */
/* global document */
import React, {
  FC, ReactNode, CSSProperties, useEffect,
} from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { MapStateToProps } from 'react-redux';
import { connect } from 'dva';
import { Loader, MyLayout } from '@components';
import { BackTop, Layout } from 'antd';
import classnames from 'classnames';
// import * as config from '@config';
import { withRouter } from 'dva/router';
import { RootState } from '@ts-types/store';
import { Dispatch } from '@ts-types/dva';
// import { logout } from '@utils';
import Error from './error';
// import '../../themes/index.less';
import './app.less';

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

const contentStyle: CSSProperties = {
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: 100,
  padding: 0,
};

const App: FC<Props> = ({
  children, dispatch, app, loading, location,
}) => {
  // const {
  //   // menu,
  // } = app;
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

  // const hasPermission = menu.filter((item) => pathToRegexp(item.component || '').exec(pathname)).length;
  const { href } = window.location;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  // const initLoading = loading.effects['app/initialize'];

  // if (openFullscreenPages.includes(pathname)) {
  //   return (
  //     <div>
  //       {children}
  //     </div>
  //   );
  // }

  // if (openPagesOnlyHeader.includes(pathname)) {
  //   return (
  //     <div>

  //       <Content>
  //         {children}
  //       </Content>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Layout>

        <Layout
          style={{ height: '100vh', overflow: 'hidden' }}
          id="mainContainer"
        >
          <BackTop target={() => document.getElementById('mainContainer')} />

          <Content style={contentStyle} />
          {/* <Footer >
            {config.footerText}
          </Footer> */}
        </Layout>
      </Layout>
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
