import { Tree, Empty } from 'antd';
import classnames from 'classnames';
import { ReactNode, useCallback, useMemo } from 'react';
import { connect } from 'umi';
import { useAnyDva } from '@/hooks';
import { getTopParentComponent } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

type Props = {
  select: string[];
  setSelect: (select: string[]) => void;
};

type TreeData = {
  title: ReactNode;
  key: string;
  children?: TreeData[];
  isLeaf?: boolean;
};

const ComponentSelect = (props: Props) => {
  const { select, setSelect } = props;

  const { getState } = useAnyDva();

  const handleSelect = useCallback(
    (selectKeys) => {
      setSelect(selectKeys);
    },
    [setSelect],
  );

  const treeData = useMemo(() => {
    const { global } = getState();
    function parseComponentToTreeData(
      component: ComponentData.TComponentData,
    ): TreeData {
      const { name, id, components } = component;
      return {
        title: name,
        key: id,
        children: components?.map(parseComponentToTreeData),
      };
    }
    const components = global.components || [];
    return select.map((item) => {
      const topComponent = getTopParentComponent(item, components);
      return parseComponentToTreeData(topComponent);
    });
  }, [select]);

  return (
    <div className={classnames(styles['component-select-form'], 'h-100')}>
      <Tree
        selectedKeys={select}
        blockNode
        showLine
        showIcon
        defaultExpandAll
        onSelect={handleSelect}
        treeData={treeData}
        style={{
          background: 'transparent',
        }}
      />
      <div className="dis-flex flex-al-cen h-100">
        {!treeData.length && (
          <Empty description="快速选择当前选中组件的指定组件" />
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentSelect);
