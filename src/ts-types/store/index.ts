/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 20:20:53
 * @LastEditTime: 2020-06-25 20:36:39
 * @LastEditors: zs
 */

import AppState from './AppState';
import LoadingState from './Loading';
import LoginState from './Login'

interface RootState {
  app: AppState
  loading: LoadingState
  login: LoginState,
}

export {
  // state:
  RootState,
  AppState,
  LoadingState,
  LoginState,
}
