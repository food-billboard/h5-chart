import { useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import Input from '@/components/ChartComponents/Common/Input';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TPercentPieBasicConfig } from '../type';

const { Item } = ConfigList;

const StatisticsConfig = (props: {
  value: TPercentPieBasicConfig['statistics'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { show, align, textStyle, addonBefore, addonAfter } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentPieBasicConfig['statistics'], value: any) => {
      onChange({
        config: {
          options: {
            statistics: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const textStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '文字',
          key: 'textStyle',
        }}
        level={2}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
    );
  }, [textStyle, onKeyChange]);

  const alignConfig = useMemo(() => {
    return (
      <Item label="对齐方式">
        <FullForm>
          <OrientSelect
            value={align}
            onChange={onKeyChange.bind(null, 'align')}
          />
        </FullForm>
      </Item>
    );
  }, [align, onKeyChange]);

  const addonBeforeConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '前缀',
          key: 'addonBefore',
          visibleRender: true,
          value: addonBefore.show,
          onChange: (value) => {
            onKeyChange('addonBefore', {
              show: value,
            });
          },
        }}
      >
        <Item label="内容">
          <FullForm>
            <Input
              value={addonBefore.value}
              onChange={(value) => {
                onKeyChange('addonBefore', {
                  value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'textStyle',
          }}
          level={2}
        >
          <FontConfigList
            value={addonBefore.textStyle}
            onChange={(value) => {
              onKeyChange('addonBefore', {
                textStyle: value,
              });
            }}
          />
        </Collapse>
      </Collapse>
    );
  }, [addonBefore, onKeyChange, onChange]);

  const addonAfterConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '后缀',
          key: 'addonAfter',
          visibleRender: true,
          value: addonAfter.show,
          onChange: (value) => {
            onKeyChange('addonAfter', {
              show: value,
            });
          },
        }}
      >
        <Item label="内容">
          <FullForm>
            <Input
              value={addonAfter.value}
              onChange={(value) => {
                onKeyChange('addonAfter', {
                  value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'textStyle',
          }}
          level={2}
        >
          <FontConfigList
            value={addonAfter.textStyle}
            onChange={(value) => {
              onKeyChange('addonAfter', {
                textStyle: value,
              });
            }}
          />
        </Collapse>
      </Collapse>
    );
  }, [addonAfter, onKeyChange, onChange]);

  return (
    <ConfigList>
      <Collapse
        child={{
          key: 'statistics',
          header: '数值',
          visibleRender: true,
          value: show,
          onChange: onKeyChange.bind(null, 'show'),
        }}
        parent={{
          activeKey: ['statistics'],
        }}
      >
        {alignConfig}
        {textStyleConfig}
        {addonBeforeConfig}
        {addonAfterConfig}
      </Collapse>
    </ConfigList>
  );
};

export default StatisticsConfig;
