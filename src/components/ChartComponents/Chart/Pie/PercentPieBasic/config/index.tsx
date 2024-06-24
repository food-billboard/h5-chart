import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { TPercentPieBasicConfig } from '../type';
import AnimationConfig from './Animation';
import ConditionConfig from './Condition';
import SeriesConfig from './Series';
import StatisticsConfig from './Statistics';

class Config extends Component<
  ComponentData.ComponentConfigProps<TPercentPieBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, animation, condition, statistics },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>数值</Tab>,
            children: (
              <ConfigList level={1}>
                <StatisticsConfig value={statistics} onChange={onChange} />
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>系列</Tab>,
            children: (
              <ConfigList level={1}>
                <SeriesConfig value={series} onChange={onChange} />
              </ConfigList>
            ),
            key: '4',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <AnimationConfig value={animation} onChange={onChange} />
              </ConfigList>
            ),
            key: '5',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
              </ConfigList>
            ),
            key: '6',
          },
        ]}
      />
    );
  }
}

export default Config;
