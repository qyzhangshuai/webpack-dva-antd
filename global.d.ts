/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-11 16:43:01
 * @LastEditTime: 2020-06-13 20:36:54
 * @LastEditors: zs
 */
declare module "*.css" {
  const content: {
    [propName: string]: any
  };
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.less" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: object;
  export default content;
}

interface Window {
  __state: any
  __app: any
}

declare module 'dva-loading'
declare module 'dva-model-extend'