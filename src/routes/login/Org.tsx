import React, { useState } from 'react';
import { OrgTree } from 'z-react-ui';
import { DataProps } from 'z-react-ui/lib/org-tree';

const horizontal = false; // true：横向  false：纵向
const collapsable = false; // true：可折叠 false：不可折叠
const expandAll = true; // true: 全部展开 false：全部折叠

interface BaseProps {
  a?: any
  // 自己添加
}

const Base: React.FC<BaseProps> = ({ }) => {
  const [value, setValue] = useState<string | number>(0);

  const dataSource: DataProps = {
    id: 0,
    label: '一级',
    children: [
      {
        id: 1,
        label: <div>二级内容1</div>,
        conditionList: '条件项',
        children: [
          {
            id: 4,
            label: '三级内容1',
            conditionList: '年后111',
          },
          {
            id: 5,
            label: '三级内容2',
          },
        ],
      },
      {
        id: 2,
        label: <div>二级内容1</div>,
        children: [{ id: 44, label: 'demo' }],
      },
    ],
  };

  const handleClick = (_e: React.MouseEventHandler<HTMLElement>, data: DataProps) => {
    console.log('data', data)
    setValue(data.id);
  };

  return (
    <OrgTree
      data={dataSource}
      activeId={value}
      horizontal={horizontal}
      collapsable={collapsable}
      expandAll={expandAll}
      onClick={handleClick}
      onConditionClick={handleClick}
    />
  );
};

export default Base;
