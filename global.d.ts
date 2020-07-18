/**
 * @description: 全局配置
 * @author: zs
 * @Date: 2020-06-11 16:43:01
 * @LastEditTime: 2020-07-18 14:32:09
 * @LastEditors: zs
 */
declare module '*.css'
declare module '*.scss'
declare module '*.less'
declare module '*.json'
declare module '*.jpg'
declare module '*.jpge'
declare module '*.png'
declare module '*.gif'
declare module '*.svg'
declare module '*.bmp'

declare module 'dva-loading'
declare module 'dva-model-extend'

interface Window {
  __state: any
  __app: any
}
