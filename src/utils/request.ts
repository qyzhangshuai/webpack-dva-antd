import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { message } from 'antd'
import { prefix } from '@config';
import { RequestResponse, DefaultOptions } from '@ts-types'
import storage from './storage'

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

const defaultOptions: DefaultOptions = {
  method: 'GET',
  headers: defaultHeaders,
  noErrorTip: false, // 没有错误提示
}

type RequestPromise<T> = Promise<Partial<AxiosResponse<T>> & {
  success: boolean,
  message: string,
  statusCode: number,
}>

export default function request(url: string, options: AxiosRequestConfig = {}): RequestPromise<RequestResponse> {
  options = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    url,
  }

  // 说明: 如果put请求携带参数是通过url的方式，那么就需要在请求中加上一个isUrl=true做一个标识
  if (options.method.toUpperCase() === 'PUT' && options.data && options.data.isUrl) {
    delete options.data.isUrl
    options.params = { ...options.data }
    delete options.data
  }
  if (options.method.toUpperCase() === 'GET' && options.data) {
    options.params = cloneDeep(options.data)
    delete options.data
  }
  // 说明：如果post请求携带参数通过 x-www-form-urlencoded的方式
  byXWWWFormUrlencoded(options, 'POST')

  // 设置 Authorization
  const token = storage.getItem(`${prefix}-token`);
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    }
  }

  return axios(options)
    .then(response => {
      const { status, statusText } = response
      const successed = checkRspStatus(response)
      if (successed) {
        const data = Array.isArray(response.data) ? response.data : (response.data.data || {})
        return Promise.resolve({
          ...response,
          success: true,
          message: statusText,
          statusCode: status,
          data,
        })
      }

      const error = {
        name: 'http error',
        message: 'http response status error',
        config: options,
        code: `${status}`,
        response,
        isAxiosError: false,
      }
      return Promise.reject(error)
    })
    .catch(error => {
      const { response } = error

      // 错误提示
      if (!(options as any).noErrorTip) {
        tipError(response || {
          ...error,
          status: 600,
        })
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { statusText } = response
        statusCode = response.status
        msg = response.data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.resolve({
        ...response,
        data: response && response.data.data || {},
        success: false,
        status: statusCode,
        message: msg,
      })
    })
}

export function checkRspStatus({ status, data = {} }: AxiosResponse) {
  if (
    (status >= 200 && status < 300)
    && (data.code === 0 || data.code === 200) // code 码是服务端返回的
  ) {
    return true;
  }

  return false;
}

function tipError(response: AxiosResponse) {
  const { data = {}, status, statusText } = response;
  let errorMsg = data.message || statusText || '请求错误，请刷新重试';
  message.error(errorMsg);

  if (status === 401 || data.code === 401) {
    storage.removeItem(`${prefix}-token`);
  }

  console.error('http返回结果的 status 码错误，错误信息是:', response);
}

// post、put等通过 x-www-form-urlencoded的方式,那么就需要在请求中加上一个isUrl=true做一个标识
function byXWWWFormUrlencoded(options, method) {
  if (options.method.toUpperCase() === method.toUpperCase() && options.data && options.data.isUrl) {
    delete options.data.isUrl
    options.params = { ...options.data }
    delete options.data
  }
}