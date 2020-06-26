/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 12:33:34
 * @LastEditTime: 2020-06-27 00:12:26
 * @LastEditors: zs
 */
import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { ConfigProvider } from 'antd';
import { DvaApp } from '@ts-types/dva';
import { History } from '@ts-types/index';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import App from './routes/app';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { ConnectedRouter } = routerRedux;

interface Props {
  history: History;
  app: DvaApp;
}

type Dynamic = (value: any) => any;

const Routers = function ({ history, app }: Props) {
  const error = (dynamic as Dynamic)({
    app,
    component: () => import('./routes/error'),
  });
  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login'),
    },
    {
      path: '/logout',
      component: () => import('./routes/logout'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <App>
          <Switch>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route
                  key={`${key}-${path}`}
                  exact
                  path={path}
                  component={(dynamic as Dynamic)({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </App>
      </ConfigProvider>
    </ConnectedRouter>
  );
};

export default Routers;
