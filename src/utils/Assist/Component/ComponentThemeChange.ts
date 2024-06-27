import color from 'color';
import { getComponentThemeConfigByType } from '@/components/ChartComponents';
import { getDvaGlobalModelData } from './index';

function covertComponentsThemeColor(
  colorList: string[],
): ComponentMethod.SetComponentMethodParamsData[] {
  const state = getDvaGlobalModelData();
  const components: ComponentData.TComponentData[] = state.components;
  const changeComponents = components
    .map((component) => {
      const { id, componentType, config } = component;
      const { convert } = (getComponentThemeConfigByType(componentType) ||
        {}) as any;
      const objectColorList = colorList.map((item) => {
        const object = color(item).object();
        return {
          r: object.r,
          g: object.g,
          b: object.b,
          a: object.a || 1,
        };
      });
      const options = convert?.(objectColorList, config.options, false);
      if (!Object.keys(options || {}).length) return false;
      return {
        value: !!convert
          ? {
              config: {
                options,
              },
            }
          : {},
        id,
        action: 'update',
      };
    })
    .filter(Boolean);
  return changeComponents as ComponentMethod.SetComponentMethodParamsData[];
}

export default covertComponentsThemeColor;
