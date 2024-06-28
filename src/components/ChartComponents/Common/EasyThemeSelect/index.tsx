import { Button } from 'antd';
import { CSSProperties, useCallback, useMemo } from 'react';
import IconFont from '@/components/ChartComponents/Common/Icon';
import { useAnyDva } from '@/hooks';
import DefaultThemeConfig from '@/pages/Designer/components/Header/ActionList/components/ThemeConfig/components/DefaultThemeConfig';
import { getComponentThemeConfigByType } from '../../index';
import Tooltip from '../Tooltip';

const EasyThemeSelect = (props: {
  component: ComponentData.TComponentData;
  onChange?: (colorList: ComponentData.TColorConfig[]) => void;
  className?: string;
  style?: CSSProperties;
}) => {
  const { onChange: propsOnChange, className, style, component } = props;

  const {
    id,
    componentType,
    config: { options },
  } = component;
  const { convert } = (getComponentThemeConfigByType(componentType) ||
    {}) as any;

  const { dispatch } = useAnyDva();

  const onChange = useCallback(
    (colorList: ComponentData.TColorConfig[]) => {
      const newOptions = convert?.(colorList, options, true);
      if (!Object.keys(newOptions || {}).length) return false;
      dispatch({
        type: 'global/setComponent',
        value: {
          value: {
            config: {
              options: newOptions,
            },
          },
          id,
          action: 'update',
        },
        needNotRequest: false,
      });
    },
    [propsOnChange, options, id],
  );

  const config = useMemo(() => {
    return (
      <>
        <DefaultThemeConfig
          onChange={(_, colorList) => onChange?.(colorList)}
          colorProps={{
            actionRender: false,
            rowProps: {
              gutter: 12,
            },
          }}
        />
      </>
    );
  }, [onChange]);

  return (
    <div className={className} style={style}>
      <Tooltip
        overlayInnerStyle={{
          width: 200,
        }}
        color={undefined}
        trigger="click"
        title={config}
      >
        <Button block icon={<IconFont type="icon-ziyuan" />}>
          选择样式
        </Button>
      </Tooltip>
    </div>
  );
};

export default EasyThemeSelect;
