/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-11 16:57:42
 * @LastEditTime: 2020-06-12 14:51:54
 * @LastEditors: zs
 */
import React from 'react';
import { connect } from 'dva';
// import { Button } from 'antd'

import styles from './IndexPage.less';
console.log('styles',styles)
function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      {/* <Button type="primary">按钮</Button> */}
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
