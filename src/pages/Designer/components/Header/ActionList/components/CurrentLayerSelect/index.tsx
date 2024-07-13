import { UnorderedListOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import ComponentList from './Form';
import { mapDispatchToProps, mapStateToProps } from './connect';

// 当前选中的组件的列表，方便快速选择
const CurrentLayerSelect = () => {
  return (
    <>
      <Tooltip
        title={<ComponentList />}
        destroyTooltipOnHide
        color={undefined}
        overlayInnerStyle={{
          height: 300,
          overflowY: 'auto',
          minWidth: 200,
        }}
      >
        <DebounceButton icon={<UnorderedListOutlined title="选中组件列表" />} />
      </Tooltip>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLayerSelect);
