/**
 * @description: 全局配置
 * @author: zs
 * @Date: 2020-06-11 16:43:01
 * @LastEditTime: 2020-06-25 12:34:09
 * @LastEditors: zs
 */
declare module '*.css' {
  const content: {
    [propName: string]: any
  };
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

interface Window {
  __state: any
  __app: any
}

interface NodeModule {
  hot: any
}

declare module 'dva-loading'
declare module 'dva-model-extend'
