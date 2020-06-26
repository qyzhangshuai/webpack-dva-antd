/**
 * @description:
 * @author: zs
 * @Date: 2020-06-26 20:29:39
 * @LastEditTime: 2020-06-26 20:38:53
 * @LastEditors: zs
 */
import React from 'react'
import { connect } from 'dva'
import { Dispatch } from '@ts-types/dva'
import { RootState } from '@ts-types/store'

interface BreadProps {
  dispatch: Dispatch
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Bread: React.SFC<BreadProps> = ({
  dispatch,
}) => {
  console.log('bread')
  return <div>Bread</div>
}

const mapStateToProps = ({ loading }: RootState) => ({
  loading,
});

export default connect(mapStateToProps)(Bread)
