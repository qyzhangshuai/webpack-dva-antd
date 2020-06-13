/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 21:17:26
 * @LastEditTime: 2020-06-13 22:27:00
 * @LastEditors: zs
 */
import { AxiosRequestConfig } from 'axios'

export { History } from 'history';
export type RequestResponse = {
  success: boolean
  message: string
  statusCode: number
  data: object | any[]
  [props: string]: any
}

export type DefaultOptions = Pick<AxiosRequestConfig, "method" | "headers"> & {
  noErrorTip: boolean
}

export type ArrayAct = 'push' | 'pop' | 'shift' | 'unshift' | 'slice' | 'splice' | 'indexof' | 'includes'