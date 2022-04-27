import { CSSProperties, useEffect, useRef } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
  useCondition,
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TRadarBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'RADAR_BASIC';

const RadarBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TRadarBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, tooltip, animation, radar, condition } =
    useChartPerConfig<TRadarBasicConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TRadarBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition);

  const { xAxisKeys, yAxisValues, seriesKeys } = useChartValueMapField(
    processedValue,
    {
      map: componentFilterMap,
      fields: {
        seriesKey: 's',
        xAxisKeyKey: 'name',
        yAxisValue: 'value',
      },
    },
  );

  const initChart = () => {
    const chart = init(
      document.querySelector(`#${chartId.current!}`)!,
      screenTheme,
      {
        renderer: 'canvas',
      },
    );
    chartInstance.current = chart;

    setOption();
  };

  const getRadar = () => {
    const {
      center,
      radius,
      axisName,
      axisLine,
      splitLine,
      splitArea,
      ...nextRadar
    } = radar;
    return {
      ...nextRadar,
      center: center.map((item) => `${item}%`),
      radius: radius + '%',
      axisName: {
        ...axisName,
        color: getRgbaString(axisName.color),
      },
      axisLine: {
        ...axisLine,
        lineStyle: {
          ...axisLine.lineStyle,
          color: getRgbaString(axisLine.lineStyle.color),
        },
      },
      splitLine: {
        ...splitLine,
        lineStyle: {
          ...splitLine.lineStyle,
          color: getRgbaString(splitLine.lineStyle.color),
        },
      },
      splitArea: {
        ...splitArea,
        areaStyle: {
          ...splitArea.areaStyle,
          color: (Array.isArray(splitArea.areaStyle.color)
            ? splitArea.areaStyle.color
            : [splitArea.areaStyle.color]
          ).map((item) => {
            return getRgbaString(item);
          }),
        },
      },
      indicator: xAxisKeys.map((item: any) => {
        return {
          name: item,
          max: 200,
        };
      }),
    };
  };

  const getSeries = () => {
    const { itemStyle, label, lineStyle, areaStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, ...nextItemStyle } = itemStyle;
    const { color: areaColor, ...nextAreaStyle } = areaStyle;

    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'radar',
      data: seriesKeys.length
        ? seriesKeys.map((item: any, index: number) => {
            return {
              itemStyle: {
                ...nextItemStyle,
                color: getRgbaString(color[index]),
              },
              areaStyle: {
                ...nextAreaStyle,
                color: getRgbaString(areaColor[index]) || 'transparent',
              },
              lineStyle: {
                ...(lineStyle[index] || {}),
                color: getRgbaString(lineStyle[index]?.color),
              },
              value: yAxisValues[item] || [],
              name: item,
            };
          })
        : [
            {
              itemStyle: {
                ...nextItemStyle,
                color: getRgbaString(color[0]),
              },
              areaStyle: {
                ...nextAreaStyle,
                color: getRgbaString(areaColor[0]) || 'transparent',
              },
              lineStyle: {
                ...(lineStyle[0] || {}),
                color: getRgbaString(lineStyle[0]?.color),
              },
              value: yAxisValues._defaultValue_,
            },
          ],
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return [baseSeries];
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

    const series = getSeries();
    const radar = getRadar();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        radar,
        legend,
        series,
        tooltip: nextTooltip,
      },
      true,
    );
    screenType !== 'edit' &&
      animation.show &&
      useChartComponentTooltip(chartInstance.current!, series, {
        interval: animation.speed,
      });
  };

  useChartComponentResize(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, [screenTheme]);

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [processedValue]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation, setOption);

  return (
    <>
      <div
        className={classnames(className, conditionClassName)}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
        id={chartId.current}
      ></div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperRadarBasic: typeof RadarBasic & {
  id: ComponentData.TComponentSelfType;
} = RadarBasic as any;

WrapperRadarBasic.id = CHART_ID;

export default WrapperRadarBasic;
