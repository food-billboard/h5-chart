import { InfoCircleOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Drawer, Tabs } from 'antd';
import classnames from 'classnames';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { connect } from 'umi';
import { Loading } from '@/components/PageLoading';
import { sleep } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import CustomConfig from './components/CustomConfig';
import DefaultThemeConfig from './components/DefaultThemeConfig';
import Tour from './components/Tour';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export type ThemeConfigRef = {
  open: () => void;
};

type Props = {
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  theme: ComponentData.TScreenTheme;
  setSelect: (select: string[]) => void;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

const ThemeConfig = forwardRef<ThemeConfigRef, Props>((props, ref) => {
  const { theme, setScreen, setSelect } = props;
  const { value, color } = theme;

  const [visible, setVisible] = useControllableValue<boolean>(props, {
    trigger: 'onVisibleChange',
    valuePropName: 'visible',
  });
  const [changeLoading, setChangeLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(
    ThemeUtil.isInternalThemeName(value) ? 'internal' : 'custom',
  );

  const [tourLoading, setTourLoading] = useState(true);

  const onStepChange = useCallback((index) => {
    // 自定义主题
    if (index === 2) {
      setActiveKey('custom');
    } else if (index === 4) {
      setActiveKey('internal');
    }
  }, []);

  const onChange = useCallback(
    (value) => {
      setChangeLoading(() => true);

      sleep(500)
        .then(() => {
          // 更改色调
          return ThemeUtil.initCurrentThemeDataAndUpdateScreenData({
            themeConfig: {
              value,
              color,
            },
            needNotRequest: false,
          });
        })
        .then(() => {
          setChangeLoading(() => false);
        });
    },
    [setScreen, color],
  );

  const open = () => {
    setSelect([]);
    setVisible(true);
  };

  const onClose = useCallback(() => {
    setVisible(false);
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
    <Drawer
      open={visible}
      maskClosable={false}
      onClose={onClose}
      title="主题色修改"
      placement="left"
      width={400}
      styles={{
        body: {
          position: 'relative',
          pointerEvents: changeLoading ? 'none' : 'all',
        },
      }}
      destroyOnClose
      afterOpenChange={(visible) => visible && setTourLoading(false)}
    >
      {changeLoading && (
        <div
          className={classnames(
            styles['designer-theme-config-loading'],
            'w-100 h-100 pos-ab',
          )}
        >
          <Loading size={25} />
        </div>
      )}
      <div className="m-b-4">
        <InfoCircleOutlined className="m-r-4" />{' '}
        此处设置的主题会被地址上的主题设置覆盖
      </div>
      <Tabs
        id={'designer-theme-config'}
        className={styles['designer-theme-config']}
        centered
        activeKey={activeKey}
        onChange={setActiveKey}
        items={[
          {
            key: 'internal',
            label: '主题色选择',
            children: (
              <DefaultThemeConfig
                id={'designer-theme-config-internal'}
                value={value}
                onChange={onChange}
              />
            ),
          },
          {
            key: 'custom',
            label: '自定义主题',
            forceRender: true,
            children: <CustomConfig setLoading={setChangeLoading} />,
          },
        ]}
      />
      <Tour onChange={onStepChange} loading={tourLoading} />
    </Drawer>
  );
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true,
})(ThemeConfig);
