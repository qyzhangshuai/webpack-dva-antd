/**
 * @description: 12
 * @author: zs
 * @Date: 2020-06-25 18:15:43
 * @LastEditTime 2020-07-01 22:20:29
 * @LastEditors zs
 */

import React, { FC, CSSProperties } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.less'

interface Props {
  fullScreen?: boolean
  spinning: boolean
  style?: CSSProperties
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Loader: FC<Props> = ({ spinning, fullScreen, style }) => {
  const classes = classNames(styles.loader, {
    [styles.hidden]: !spinning,
    [styles.fullScreen]: fullScreen,
  });

  return (
    <div className={classes} style={style}>
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>加载中...</div>
      </div>
    </div>
  )
}
// propTypes和defaultProps需要配合使用
Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
}
Loader.defaultProps = {
  spinning: false,
  fullScreen: false,
}

export default Loader
