import { ReduxSagaEffects, DvaSetupParams, ReduxAction } from '@ts-types/dva';
import { AppState } from '@ts-types/store';
import { modelExtend } from './common';

const namespace = 'app';

export default modelExtend<AppState>({
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
    save(state: AppState, action: ReduxAction) {
      return { ...state, ...action.payload };
    },
  },

});
