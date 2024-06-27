export type TScatterBasicConfigItemStyle = {
  color: ComponentData.TColorConfig;
  borderColor: ComponentData.TColorConfig;
  borderType: ComponentData.ComponentLineStyle;
  borderWidth: number;
  shadow: Omit<ComponentData.TBoxShadow, 'spread'>;
};

export type TScatterBasicConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  series: {
    symbol: ComponentData.ComponentSymbol;
    symbolSize: number;
    itemStyle: TScatterBasicConfigItemStyle[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
