export type TPieBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
      position: 'outside' | 'inside';
    };
    labelLine: {
      show: boolean;
      length: number;
      length2: number;
      smooth: boolean;
      lineStyle: {
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    center: [number, number];
    radius: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
