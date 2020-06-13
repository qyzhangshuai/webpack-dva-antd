/**
 * @description:
 * @author: zs
 * @Date: 2020-06-13 20:35:50
 * @LastEditTime: 2020-06-13 21:47:27
 * @LastEditors: zs
 */
/**
/**
 * 公共 model
 * @author ronffy
 */
import _modelExtend from 'dva-model-extend';
import { DvaModel } from '@ts-types/dva';

const commonModel = {
  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
    error(state: any, { payload }: any) {
      return {
        ...state,
        error: payload,
      };
    },
    updateParams(state: any, { payload }: any) {
      const { params } = state;
      return {
        ...state,
        params: {
          ...params,
          ...payload,
        },
      };
    },
    updatePagination(state: any, { payload }: any) {
      const { pagination } = state;
      return {
        ...state,
        pagination: {
          ...pagination,
          ...payload,
        },
      };
    },
  },
};

const modelExtend = <T>(model: DvaModel<T>): DvaModel<T> => _modelExtend(commonModel, model);

export {
  modelExtend,
  commonModel,
};
