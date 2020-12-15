/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 12:33:34
 * @LastEditTime: 2020-07-15 09:18:57
 * @LastEditors: zs
 */
import React from 'react';
import { routerRedux, router } from 'dva';
// @ts-ignore  因为dva中虽然导出了dynamic，但是index.d.ts却没有ts声明，声明在dynamic.d.ts中
import { dynamic } from 'dva';
import { ConfigProvider } from 'antd';
import { DvaApp } from '@ts-types/dva';
import { History } from '@ts-types/index';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import App from './routes/app';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const { ConnectedRouter } = routerRedux;
const { Switch, Route, } = router
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
      path: '/usercenter',
      component: () => import('./routes/usercenter'),
    },
    {
      path: '/zs/example',
      models: () => [import('./models/example')],
      component: () => import('./routes/example'),
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
