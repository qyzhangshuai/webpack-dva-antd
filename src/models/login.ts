/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:36:37
 * @LastEditTime: 2020-07-12 15:46:50
 * @LastEditors: zs
 */
import { ReduxSagaEffects, DvaSetupParams, ReduxAction } from '@ts-types/dva';
import { LoginState } from '@ts-types/store';
import { loginRouter, prefix } from '@config'
import storage from '@utils/storage'
import { modelExtend } from './common';

const namespace = 'login';

export default modelExtend<LoginState>({
  namespace,
  state: {},
  subscriptions: {
    setupHistory({ history }: DvaSetupParams) {
      history.listen(({ pathname }) => {
        // 如果当前是登录页，且 storage 里有 token，则先清除 token ，然后刷新当前页面
        if (pathname === loginRouter) {
          const token = storage.getItem(`${prefix}-token`);
          if (token) {
            storage.removeItem(`${prefix}-token`);
            window.location.reload();
          }
        }
      })
    },
  },
  effects: {
    // * login({ payload }: ReduxAction, { put, call }: ReduxSagaEffects) {
    //   const { success, data } = yield call(loginService.login, {
    //     username: payload[`${prefix}-username`],
    //     password: payload[`${prefix}-password`],
    //   })
    //   if (success && data) {
    //     // 将 token 写入 cookie
    //     storage.setItem(`${prefix}-token`, data.token);

    //     // 登录成功后进行初始化工作
    //     yield put({ type: 'app/initialize' })
    //   } else {
    //     console.warn('login-login 报错');
    //   }
    // },
    * login({ payload }: ReduxAction, { put, call }: ReduxSagaEffects) {
      const success = true
      if (success) {
        // 将 token 写入 cookie
        storage.setItem(`${prefix}-token`, 'zs');

        // 登录成功后进行初始化工作
        yield put({ type: 'app/initialize' })
      } else {
        console.warn('login-login 报错');
      }
    },
  },

  reducers: {
    save(state: LoginState, action: ReduxAction) {
      return { ...state, ...action.payload };
    },
  },

});
