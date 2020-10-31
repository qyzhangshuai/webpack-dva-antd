/**
 * @description:
 * @author: zs
 * @Date: 2020-06-14 13:35:48
 * @LastEditTime: 2020-10-31 16:31:05
 * @LastEditors: zs
 */
import React from 'react';
import { Input, Button, Select } from 'antd'
import { connect } from 'dva'
import storage from '@utils/storage'
import * as config from '@config'
import moment from 'moment'
import yay from '@assets/yay.jpg'
import styles from './index.less'

const { prefix } = config
const { Option } = Select;
interface LoginProps {
  [props: string]: any
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------
const namespace = 'login'

const Login: React.SFC<LoginProps> = ({
  dispatch,
}) => {
  
  const handleLogin = () => {
    storage.setItem(`${prefix}-token`, 'zhangsan')
    // window.location.href = 'http://127.0.0.1:4009/usercenter'
    dispatch({ type: `${namespace}/login` })
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const q = () => {
    fetch('/proxy/app/users3', {
      method: 'POST',
      // body: JSON.stringify(postData)
    }).then(res => res.json()).then(res => {
      console.log('res', res)
    })
  }

  return (
    <>
      <div className={styles.login}>
        <Input placeholder="请输入账号" />
        <Input placeholder="请输入密码" />
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Option value="jack">Jack1</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          {/* <div onClick={h}>123</div> */}
          <Option value="Yiminghe">yiminjjghehehe</Option>
        </Select>
        <Button onClick={handleLogin}>登录11</Button>
        <Button onClick={q}>请求数据</Button>
        <Button onClick={q}>请求数据</Button>
        <Button onClick={q}>请求数据</Button>
        <Button onClick={q}>请求数据</Button>
        <Button onClick={q}>请求数据</Button>
        <Button onClick={q}>请求数据</Button>
        {/* <div>{{}}</div> */}
        <img src={yay} alt="" style={{ width: 100, display: 'block' }} />
        <div>验证moment中国化</div>
        <div>{moment().weekday(1).format('YYYY-MM-DD')}</div>
        <div>{moment().format('E')}</div>
        <div>{moment().format('dddd')}</div>
        <div>{moment('20111031', 'YYYYMMDD').fromNow()}</div>
      </div>
    </>
  )
}

export default connect(({ loading }) => ({ loading }))(Login)
