/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 12:33:34
 * @LastEditTime: 2020-07-05 17:44:04
 * @LastEditors: zs
 */
import { ReduxSagaEffects, DvaSetupParams, ReduxAction } from '@ts-types/dva';
import { RootState, AppState } from '@ts-types/store';
import qs from 'qs';
import * as config from '@config';
import { routerRedux } from 'dva/router';
import storage from '@utils/storage'
import { modelExtend } from './common';

const namespace = 'app';
const { prefix, loginRouter } = config;

export default modelExtend<AppState>({
  namespace,
  state: {
    user: {
      token: 'token',
      id: 1,
      username: 'zhangsan',
    },
    menu: [
      {
        id: 82,
        name: '个人通讯录',
        sort: 231,
        path: 'solution',
        component: null,
        pid: 0,
        cache: false,
        hidden: false,
        componentName: '-',
        icon: 'maillist',
        children: null,
        createTime: 1585195143000,
        iframe: false,
      },
      {
        id: 84,
        name: '群管理',
        sort: 233,
        path: 'chat',
        component: '/zs/example',
        pid: 82,
        cache: false,
        hidden: false,
        componentName: '-',
        icon: 'chat',
        children: null,
        createTime: 1585195143000,
        iframe: false,
      },
    ],
    defaultMenu: {},
    menuPopoverVisible: false, // 浮层的显示与隐藏
    siderFold: storage.getItem(`${prefix}siderFold`) === 'true', // 抽屉的显示与隐藏
    darkTheme: storage.getItem(`${prefix}darkTheme`) === 'true', // 控制主题色
    isNavbar: document.body.clientWidth < 769, // 为true对应浮层的button，为false则为抽屉的弹层
    navOpenKeys: JSON.parse(storage.getItem(`${prefix}navOpenKeys`)) || [],
    defaultOpenKeys: [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }: DvaSetupParams) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: qs.parse(location.search.split('?')[1]),
          },
        });
      });
    },

    setup({ dispatch }: DvaSetupParams) {
      dispatch({ type: 'initialize' });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' });
        }, 300);
      };
    },
  },

  effects: {
    * initialize({ payload }: ReduxAction, { put, select, call }: ReduxSagaEffects) {
      const token = storage.getItem(`${prefix}-token`);
      const { locationPathname }: AppState = yield select((_) => _[namespace]);

      // token 不存在时直接跳转到登录页
      if (!token) {
        yield put(routerRedux.push({
          pathname: loginRouter,
        }))
        return undefined;
      }

      // const { success, data: user } = yield call(appService.fetchUser);

      // // 请求用户信息失败时跳转到登录页
      // if (!success || !user) {
      //   yield put(routerRedux.push({
      //     pathname: loginRouter,
      //   }))
      //   return;
      // }

      // const { success: menuSuccess, data: menuResult } = yield call(menusService.fetchMenus)
      // if (!menuSuccess || !menuResult) {
      //   console.warn('initialize - 菜单请求失败');
      //   return;
      // }
      // const menuList: AppState['menu'] = menuResult.menuList;
      // const defaultMenu = menuResult.defaultMenu || findFirstMenuItem(menuList);

      // user && user.roles && user.roles.forEach(role => {
      //   if (operateList.includes(role)) {
      //     isOperate = true
      //   }
      // })

      // yield put({
      //   type: 'updateState',
      //   payload: {
      //     user,
      //     menu: menuList,
      //     defaultMenu,
      //     defaultOpenKeys: getDefaultOpenKeys(menuList),
      //   },
      // })

      if (
        locationPathname === '/'
        || locationPathname === '/mini'
        || locationPathname === '/mini/'
        || locationPathname === loginRouter
      ) {
        yield put(
          routerRedux.push({
            // pathname: '/usercenter',
            pathname: '/login',
          }),
        );
      }
    },

    * changeNavbar(_action: ReduxAction, { put, select }: ReduxSagaEffects) {
      const { app }: RootState = yield (select((_: RootState) => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
  },

  reducers: {
    // switchSider(state: AppState, { payload }) {
    //   if (payload) {
    //     storage.setItem(`${prefix}siderFold`, payload.siderFold);
    //     return {
    //       ...state,
    //       siderFold: payload.siderFold
    //     };
    //   }
    //   storage.setItem(`${prefix}siderFold`, !state.siderFold)
    //   return {
    //     ...state,
    //     siderFold: !state.siderFold,
    //   };
    // },

    // switchTheme(state: AppState) {
    //   storage.setItem(`${prefix}darkTheme`, !state.darkTheme)
    //   return {
    //     ...state,
    //     darkTheme: !state.darkTheme,
    //   }
    // },

    switchMenuPopver(state: AppState) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    handleNavbar(state: AppState, { payload }: ReduxAction) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    handleNavOpenKeys(state: AppState, { payload: navOpenKeys }: ReduxAction) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
});
