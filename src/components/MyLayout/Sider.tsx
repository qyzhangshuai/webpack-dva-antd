/**
 * @description:
 * @author: zs
 * @Date: 2020-06-26 20:29:39
 * @LastEditTime: 2020-06-26 20:32:11
 * @LastEditors: zs
 */
import React from 'react'
import { connect } from 'dva'
import { Dispatch } from '@ts-types/dva'
import { RootState } from '@ts-types/store'

interface SiderProps {
  dispatch: Dispatch
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Sider: React.SFC<SiderProps> = ({
  dispatch,
}) => <div>Sider</div>

const mapStateToProps = ({ loading }: RootState) => ({
  loading,
});

export default connect(mapStateToProps)(Sider)
