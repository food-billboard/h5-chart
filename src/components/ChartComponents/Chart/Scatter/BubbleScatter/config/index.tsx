import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TitleConfig from './Title';
import TooltipConfig from './Tooltip';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import AxisConfig from './Axis';
import ConditionConfig from './Condition';
import GridConfig from './GridConfig';
import { TBubbleScatterConfig } from '../type';
class Config extends Component<
  ComponentData.ComponentConfigProps<TBubbleScatterConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, tooltip, animation, xAxis, condition, title, grid },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>网格</Tab>,
            children: (
              <ConfigList level={1}>
                <GridConfig value={grid} onChange={onChange} />
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>标题</Tab>,
            children: (
              <ConfigList level={1}>
                <TitleConfig value={title} onChange={onChange} />
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>坐标轴</Tab>,
            children: (
              <ConfigList level={1}>
                <AxisConfig value={xAxis} onChange={onChange} />
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>提示文字</Tab>,
            children: (
              <ConfigList level={1}>
                <TooltipConfig value={tooltip} onChange={onChange} />
              </ConfigList>
            ),
            key: '4',
          },
          {
            label: <Tab>系列</Tab>,
            children: (
              <ConfigList level={1}>
                <SeriesConfig value={series} onChange={onChange} />
              </ConfigList>
            ),
            key: '5',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <AnimationConfig value={animation} onChange={onChange} />
              </ConfigList>
            ),
            key: '6',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
              </ConfigList>
            ),
            key: '7',
          },
        ]}
      />
    );
  }
}

export default Config;
