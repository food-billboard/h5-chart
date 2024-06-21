export type TPercentPieBasicConfig = {
  statistics: {
    show: boolean;
    align: 'vertical' | 'horizontal';
    textStyle: ComponentData.TFontConfig;
    addonBefore: {
      show: boolean;
      value: string;
      textStyle: ComponentData.TFontConfig;
    };
    addonAfter: {
      show: boolean;
      value: string;
      textStyle: ComponentData.TFontConfig;
    };
  };
  series: {
    colorPrimary: ComponentData.TColorConfig;
    colorSecondary: ComponentData.TColorConfig;
    radius: [number, number];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
