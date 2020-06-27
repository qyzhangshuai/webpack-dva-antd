/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:35:48
 * @LastEditTime: 2020-06-27 17:35:45
 * @LastEditors: zs
 */
import React from 'react';
import { Input, Button } from 'antd'
import storage from '@utils/storage'
import * as config from '@config'
import styles from './index.less'

const { prefix } = config

const Login = () => {
  const handleLogin = () => {
    storage.setItem(`${prefix}-token`, 'zhangsan')
    window.location.href = 'http://127.0.0.1:4000'
  }

  return (
    <div>
      <Input placeholder="请输入账号" />
      <Input placeholder="请输入密码" />
      <Button onClick={handleLogin}>登录</Button>
    </div>
  )
}

export default Login;
