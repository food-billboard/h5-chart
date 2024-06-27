export type TStateListConfigStateList = {
  backgroundColor: ComponentData.TColorConfig;
  borderRadius: [number, number, number, number];
};

export type TStateListConfig = {
  margin: [number, number];
  count: number;
  column: number;
  padding: [number, number];
  align: {
    vertical: 'flex-start' | 'flex-end' | 'center';
    horizontal: 'flex-start' | 'flex-end' | 'center';
  };
  textStyle: ComponentData.TFontConfig;
  stateList: TStateListConfigStateList[];
  condition: ComponentData.ComponentConditionConfig;
};
