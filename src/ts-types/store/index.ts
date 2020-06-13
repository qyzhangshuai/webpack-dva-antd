/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 20:20:53
 * @LastEditTime: 2020-06-13 20:22:44
 * @LastEditors: zs
 */

import AppState, { MenuItem } from './AppState';
import Loading from './Loading';

import { Pagination } from './common';

interface RootState {
  app: AppState
  loading: Loading

}

export {
  // state:
  RootState,
  AppState,

  Loading,

}