/**
 * @description: Example
 * @author: zs
 * @Date: 2020-06-27 17:52:50
 * @LastEditTime: 2020-06-27 19:02:59
 * @LastEditors: zs
 */
import React from 'react'
import { connect } from 'dva'
import { Dispatch } from '@ts-types/dva'
import { RootState } from '@ts-types/store'

interface ExampleProps {
  dispatch: Dispatch
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Example: React.SFC<ExampleProps> = ({
  dispatch,
}) => {
  console.log('11')

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
      <div>example</div>
    </div>
  )
}

const mapStateToProps = ({ loading }: RootState) => ({
  loading,
});

export default connect(mapStateToProps)(Example)
