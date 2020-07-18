/**
 * @description: 全局配置
 * @author: zs
 * @Date: 2020-06-11 16:43:01
 * @LastEditTime: 2020-07-18 11:29:03
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
declare module '*.jpg' {
  const content: any;
  export default content;
}
declare module '*.jpge' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.gif' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.bmp' {
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
