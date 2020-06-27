/**
 * @description: example
 * @author: zs
 * @Date: 2020-06-27 17:51:24
 * @LastEditTime: 2020-06-27 17:51:51
 * @LastEditors: zs
 */

import { ReduxSagaEffects, DvaSetupParams, ReduxAction } from '@ts-types/dva';
import { LoginState } from '@ts-types/store';
import { modelExtend } from './common';

const namespace = 'example';

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
