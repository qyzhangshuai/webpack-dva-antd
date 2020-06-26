/**
 * @description:
 * @author: zs
 * @Date: 2020-06-26 20:29:39
 * @LastEditTime: 2020-06-26 20:30:31
 * @LastEditors: zs
 */
import React from 'react'
import { connect } from 'dva'
import { Dispatch } from '@ts-types/dva'
import { RootState } from '@ts-types/store'

interface MenuProps {
  dispatch: Dispatch
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Menu: React.SFC<MenuProps> = ({
  dispatch,
}) => <div>Menu</div>

const mapStateToProps = ({ loading }: RootState) => ({
  loading,
});

export default connect(mapStateToProps)(Menu)
