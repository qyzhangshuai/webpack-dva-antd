/**
 * @description:
 * @author: zs
 * @Date: 2020-06-10 20:11:15
 * @LastEditTime: 2020-07-07 23:05:31
 * @LastEditors: zs
 */

import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import { createBrowserHistory } from 'history'
import { RootState } from '@ts-types/store';
// import '@babel/polyfill'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createBrowserHistory(),
  onError(error: Error) {
    message.error(`dva报错: ${error.message}`)
  },
  onStateChange(state: RootState) {
    window.__state = state
  },
})

window.__app = app;

// 2. Model
app.model(require('./models/app').default)

// 3. Router
app.router(require('./router').default)

// 4. Start
app.start('#root')
