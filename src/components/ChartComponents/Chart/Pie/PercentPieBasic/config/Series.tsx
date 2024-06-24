import { useCallback, useMemo } from 'react';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ColorSelect from '@/components/ColorSelect';
import { TPercentPieBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPercentPieBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { radius, colorPrimary, colorSecondary } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentPieBasicConfig['series'], value: any) => {
      onChange({
        config: {
          options: {
            series: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const radiusConfig = useMemo(() => {
    return (
      <Item label="饼图大小（%）">
        <HalfForm label="内">
          <InputNumber
            max={100}
            min={0}
            value={radius[0]}
            onChange={(value) => onKeyChange('radius', [value, radius[1]])}
            className="w-100"
          />
        </HalfForm>
        <HalfForm label="外">
          <InputNumber
            max={100}
            min={0}
            value={radius[1]}
            onChange={(value) => onKeyChange('radius', [radius[0], value])}
            className="w-100"
          />
        </HalfForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="颜色">
        <FullForm label="百分比颜色">
          <ColorSelect
            value={colorPrimary}
            onChange={onKeyChange.bind(null, 'colorPrimary')}
          />
        </FullForm>
        <FullForm label="占位块颜色">
          <ColorSelect
            value={colorSecondary}
            onChange={onKeyChange.bind(null, 'colorSecondary')}
          />
        </FullForm>
      </Item>
    );
  }, [colorPrimary, colorSecondary, onKeyChange, onChange]);

  return (
    <ConfigList>
      {radiusConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
