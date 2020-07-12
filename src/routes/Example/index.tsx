/**
 * @description: Example
 * @author: zs
 * @Date: 2020-06-27 17:52:50
 * @LastEditTime: 2020-07-12 19:56:29
 * @LastEditors: zs
 */
import React from 'react'
import { connect } from 'dva'
import { Dispatch } from '@ts-types/dva'
import { RootState } from '@ts-types/store'
import styles from './index.less'

interface ExampleProps {
  dispatch: Dispatch
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const style111: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  zIndex: 9999,
};

const Example: React.SFC<ExampleProps> = ({
  dispatch,
}) => {
  console.log('11')

  return (
    <div style={{ height: '600vh', padding: 8 }}>
      <div>Example</div>
      <div>Example</div>
      <div>Examplsdfsdfe</div>
      <div>Example</div>
      <div>Example</div>
      {/* <div onClick={h}>Example</div> */}
    </div>
  )
}

const mapStateToProps = ({ loading }: RootState) => ({
  loading,
});

export default connect(mapStateToProps)(Example)
