/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:36:37
 * @LastEditTime: 2020-06-14 20:35:00
 * @LastEditors: zs
 */
import { ReduxSagaEffects, DvaSetupParams, ReduxAction } from '@ts-types/dva';
import { LoginState } from '@ts-types/store';
import { modelExtend } from './common';

const namespace = 'login';

export default modelExtend<LoginState>({
  namespace,
  state: {},
  subscriptions: {
    setup({ dispatch, history }: DvaSetupParams) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    * fetch({ payload }: ReduxAction, { put }: ReduxSagaEffects) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state: LoginState, action: ReduxAction) {
      return { ...state, ...action.payload };
    },
  },

});
