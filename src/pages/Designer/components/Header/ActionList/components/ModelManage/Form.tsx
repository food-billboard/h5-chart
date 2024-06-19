import { InfoCircleOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import Modal from '@/components/FocusModal';
import IconTooltip from '@/components/IconTooltip';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ModelList from './components/ModelList';
import styles from './index.less';

export type ModelConfigRef = {
  open: () => void;
};

type Props = {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

const ModelConfig = forwardRef<ModelConfigRef, Props>((props, ref) => {
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    trigger: 'onVisibleChange',
    valuePropName: 'visible',
  });

  const open = () => {
    setVisible(true);
  };

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const title = useMemo(() => {
    let tooltip = '';
    if (GlobalConfig.IS_STATIC) {
      tooltip = '通过内置的模板可以快速将整体的大屏布局完成。';
    } else {
      tooltip =
        '通过内置的模板可以快速将整体的大屏布局完成，或者也可以通过自定义的模板来新增。';
    }
    return (
      <>
        模板选择
        <IconTooltip title={tooltip}>
          <InfoCircleOutlined className="m-l-4" />
        </IconTooltip>
      </>
    );
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Modal
      open={visible}
      maskClosable={false}
      onCancel={onClose}
      title={title}
      width={620}
      styles={{
        body: {
          height: 400,
          overflowY: 'auto',
          position: 'relative',
        },
      }}
    >
      <div className={styles['model-manage-form']}>
        <ModelList onClose={onClose} />
      </div>
    </Modal>
  );
});

export default ModelConfig;
