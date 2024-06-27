import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TPercentPieBasicConfig } from './type';

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPercentPieBasicConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'click',
            name: '当点击项时',
            fields: [
              {
                key: 'value',
                variable: '',
                description: '数据值',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click',
            name: '点击',
          },
        ],
      },
      data: {
        request: {
          value: {
            value: 66,
          },
        },
        filter: {
          map: [
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'number',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        statistics: {
          show: true,
          align: 'horizontal',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
          addonBefore: {
            show: false,
            value: '',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              fontSize: 24,
            },
          },
          addonAfter: {
            show: true,
            value: '%',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              fontSize: 24,
            },
          },
        },
        series: {
          radius: [50, 60],
          colorPrimary: DEFAULT_THEME_COLOR_LIST_DATA[0],
          colorSecondary: {
            ...DEFAULT_THEME_COLOR_LIST_DATA[0],
            a: 0.3,
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPercentPieBasicConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 400,
          height: 400,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: TPercentPieBasicConfig,
    forceSeries = false,
  ) => {
    return {
      series: {
        colorPrimary: colorList[0],
        colorSecondary: {
          ...colorList[0],
          a: 0.3,
        },
      },
    };
  },
};
