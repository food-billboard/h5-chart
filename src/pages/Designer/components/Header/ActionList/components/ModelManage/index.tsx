import { BookOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { useState } from 'react';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import ModelConfig from './Form';
import { mapDispatchToProps, mapStateToProps } from './connect';

// 模板选择
const ModelManageIcon = (props: { flag: ComponentData.ScreenFlagType }) => {
  const { flag } = props;

  const [visible, setVisible] = useState(false);

  const { run: handleOpen } = useDebounceFn(
    () => {
      setVisible((prev) => !prev);
    },
    { wait: 200 },
  );

  if (flag === 'H5') return null;

  return (
    <>
      <Tooltip title="模板选择">
        <DebounceButton
          icon={<BookOutlined title="主题色" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <ModelConfig visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelManageIcon);
