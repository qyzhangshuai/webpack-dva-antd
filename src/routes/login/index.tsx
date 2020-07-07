/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:35:48
 * @LastEditTime: 2020-07-05 17:56:56
 * @LastEditors: zs
 */
import React from 'react';
import { Input, Button, Select } from 'antd'
import storage from '@utils/storage'
import * as config from '@config'
import styles from './index.less'

const { prefix } = config
const { Option } = Select;
interface LoginProps {
  [props: string]: any
}

const Login: React.SFC<LoginProps> = () => {
  const handleLogin = () => {
    storage.setItem(`${prefix}-token`, 'zhangsan')
    window.location.href = 'http://127.0.0.1:4009/usercenter'
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <div>
      <Input placeholder="请输入账号" />
      <Input placeholder="请输入密码" />
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Button onClick={handleLogin}>登录</Button>
    </div>
  )
}

export default Login;
