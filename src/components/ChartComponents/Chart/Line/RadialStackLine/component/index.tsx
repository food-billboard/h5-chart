import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useEffect, useRef } from 'react';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
  useCondition,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TRadialStackLineConfig } from '../type';

const RadialStackLine = (
  props: ComponentData.CommonComponentProps<TRadialStackLineConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TRadialStackLineConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TRadialStackLineConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition, ConditionComponent } = useCondition({
    onCondition,
    screenType,
  });

  const { seriesKeys, xAxisKeys, yAxisValues } = useChartValueMapField(
    processedValue,
    {
      map: componentFilterMap,
      fields: {
        seriesKey: 's',
        xAxisKeyKey: 'x',
        yAxisValue: 'y',
      },
    },
  );

  const onClick = (params: any) => {
    const { seriesName, name, value } = params;
    const target = {
      x: name,
      y: value,
      s: seriesName,
    };
    syncInteractiveAction('click', target);
    linkageMethod('click-item', target);
  };

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

  const getSeries = () => {
    const { areaStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      type: 'line',
      smooth: true,
      // * 暂时不知道干嘛用的
      stack: CHART_ID,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      triggerLineEvent: false,
      areaStyle: {
        color: radialGradientColor(areaStyle.color[0]) || 'transparent',
      },
      data: yAxisValues._defaultValue_,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const realSeries = seriesKeys.length
      ? seriesKeys.map((item: any, index: number) => {
          return {
            ...baseSeries,
            areaStyle: {
              color: radialGradientColor(areaStyle.color[index]),
            },
            data: yAxisValues[item] || [],
            name: item,
          };
        })
      : [baseSeries];

    return realSeries;
  };

  const setOption = () => {
    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        legend: {
          ...legend,
          data: seriesKeys,
        },
        series,
        xAxis: [
          {
            ...xAxis,
            data: xAxisKeys,
          },
        ],
        yAxis: [yAxis],
        tooltip: {
          ...tooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
      },
      true,
    );
  };

  useChartComponentResize(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, [screenTheme]);

  useEffect(() => {
    chartInstance.current?.off('click');
    chartInstance.current?.on('click', onClick);
  }, [syncInteractiveAction]);

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, seriesKeys, xAxisKeys, yAxisValues]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation, setOption);

  return (
    <>
      <ConditionComponent
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
      >
        <Wrapper border={border}>
          <div id={chartId.current} className="w-100 h-100"></div>
          {children}
        </Wrapper>
      </ConditionComponent>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperRadialStackLine: typeof RadialStackLine & {
  id: ComponentData.TComponentSelfType;
} = RadialStackLine as any;

WrapperRadialStackLine.id = CHART_ID;

export default WrapperRadialStackLine;
