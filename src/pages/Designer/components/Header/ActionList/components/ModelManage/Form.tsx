import { InfoCircleOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Switch } from 'antd';
import { set } from 'lodash';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { connect } from 'umi';
import Tooltip from '@/components/ChartComponents/Common/Tooltip';
import Modal from '@/components/FocusModal';
import IconTooltip from '@/components/IconTooltip';
import { useAnyDva } from '@/hooks';
import { ConnectState } from '@/models/connect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ModelList from './components/ModelList';
import styles from './index.less';

export type ModelConfigRef = {
  open: () => void;
};

type Props = {
  visible?: boolean;
  modelShow: boolean;
  onVisibleChange?: (visible: boolean) => void;
  setScreenData: (value: SuperPartial<ComponentData.TScreenData>) => void;
};

const ModelConfig = forwardRef<ModelConfigRef, Props>((props, ref) => {
  const { modelShow, setScreenData } = props;

  const { getState } = useAnyDva();

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
          <InfoCircleOutlined className="m-lr-4" />
        </IconTooltip>
        <Tooltip title="在大屏画布中显示模板占位符">
          <Switch
            checked={modelShow}
            onChange={(checked) => {
              const newScreenData = {
                ...getState().global.screenData,
              };
              set(newScreenData, 'config.attr.model.show', checked);
              setScreenData(newScreenData);
            }}
          />
        </Tooltip>
      </>
    );
  }, [modelShow]);

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

export default connect(
  (state: ConnectState) => {
    return {
      modelShow: state.global.screenData.config.attr.model.show,
    };
  },
  (dispatch) => {
    return {
      setScreenData: (value: any) =>
        dispatch({ type: 'global/setScreen', value }),
    };
  },
  null,
  {
    forwardRef: true,
  },
)(ModelConfig);
