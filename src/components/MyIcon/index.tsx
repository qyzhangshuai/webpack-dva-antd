/**
 * @description: 自定义图标
 * @author: zs
 * @Date: 2020-07-12 16:07:34
 * @LastEditTime: 2020-07-12 16:10:02
 * @LastEditors: zs
 */

import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const MyIcon = ({ type, ...otherProps }) => {
    const Iconfont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1757485_frjiub0tah7.js',
    })
    return <Iconfont type={`icon-${type}`} {...otherProps} />
};

export default MyIcon;
