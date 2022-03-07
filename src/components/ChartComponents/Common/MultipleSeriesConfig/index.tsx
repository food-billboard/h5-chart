import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GhostButton from '@/components/GhostButton';
import styles from './index.less';

const { TabPane } = Tabs;

const MultipleSeriesConfig = (props: {
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  counter: number;
  max?: number;
  renderContent: (index: number) => ReactNode;
}) => {
  const { onAdd, onRemove, counter, max, renderContent } = props;

  const [activeKey, setActiveKey] = useState<string>('0');

  const onChange = useCallback((activeKey) => {
    setActiveKey(activeKey);
  }, []);

  const add = useCallback(() => {
    setActiveKey(counter.toString());
    onAdd?.();
  }, [onAdd, counter]);

  const remove = useCallback(
    (targetKey) => {
      const index = parseInt(targetKey);
      setActiveKey((index === 0 ? 0 : index - 1).toString());
      onRemove?.(index);
    },
    [onRemove],
  );

  const onEdit = useCallback(
    (targetKey, action) => {
      if (action === 'add') {
        add();
      } else if (action === 'remove') {
        remove(targetKey);
      }
    },
    [add, remove],
  );

  const hideAdd = useMemo(() => {
    if (typeof max !== 'number') return false;
    return max <= counter;
  }, [max, counter]);

  return (
    <>
      {!hideAdd && (
        <GhostButton
          icon={<PlusOutlined />}
          onClick={add}
          className="m-t-8 m-b-4"
        >
          新增系列
        </GhostButton>
      )}
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        hideAdd
        className={styles['multiple-series-config']}
      >
        {new Array(counter).fill(0).map((_, index) => {
          return (
            <TabPane tab={`系列${index + 1}`} key={index.toString()}>
              {renderContent(index)}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default MultipleSeriesConfig;
