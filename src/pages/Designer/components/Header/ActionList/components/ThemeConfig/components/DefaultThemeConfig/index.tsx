import { Space } from 'antd';
import type { SpaceProps } from 'antd';
import { useCallback, useMemo } from 'react';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorItem, { ColorItemProps } from '../ColorItem';

const DefaultThemeConfig = (
  props: Partial<Omit<SpaceProps, 'onChange' | 'value'>> & {
    value?: string;
    onChange?: (value: string, colorList: ComponentData.TColorConfig[]) => void;
    colorProps?: Partial<ColorItemProps>;
  },
) => {
  const { value, onChange, colorProps = {}, ...nextProps } = props;

  const COLOR_MAP: {
    [key: string]: string[];
  } = useMemo(() => {
    return ThemeUtil.themeNameList.reduce<any>((acc, cur) => {
      if (ThemeUtil.isInternalThemeName(cur))
        acc[cur] = ThemeUtil.getThemeColorList(cur).slice(0, 6);
      return acc;
    }, {});
  }, []);

  const onSelectColor = useCallback(
    (theme) => {
      const colorList = ThemeUtil.getThemeColorObjectList(theme) || [];
      onChange?.(theme, colorList);
    },
    [onChange],
  );

  return (
    <Space direction="vertical" className="w-100 h-100" {...nextProps}>
      {Object.entries(COLOR_MAP).map((item) => {
        const [theme, colorList] = item;
        return (
          <ColorItem
            {...colorProps}
            value={colorList}
            name={theme}
            onClick={onSelectColor.bind(null, theme)}
            checked={value === theme}
            key={theme}
          />
        );
      })}
    </Space>
  );
};

export default DefaultThemeConfig;
