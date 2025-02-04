import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipConfig from './Tooltip';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import ConditionConfig from './Condition';
import { TTreeBasicConfig } from '../type';
class Config extends Component<
  ComponentData.ComponentConfigProps<TTreeBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, tooltip, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>提示文字</Tab>,
            children: (
              <ConfigList level={1}>
                <TooltipConfig value={tooltip} onChange={onChange} />
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>系列</Tab>,
            children: (
              <ConfigList level={1}>
                <SeriesConfig value={series} onChange={onChange} />
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <AnimationConfig value={animation} onChange={onChange} />
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
              </ConfigList>
            ),
            key: '4',
          },
        ]}
      />
    );
  }
}

export default Config;
