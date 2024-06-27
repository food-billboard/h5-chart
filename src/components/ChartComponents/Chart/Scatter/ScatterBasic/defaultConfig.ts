import { omit, merge } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_X_AXIS_CONFIG,
  DEFAULT_Y_AXIS_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TScatterBasicConfig, TScatterBasicConfigItemStyle } from './type';

const DEFAULT_NAME_LABEL = getDate(100);
const DEFAULT_DATE_VALUE = getNumberValue(100, 0, 20);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

export const DEFAULT_ITEM_STYLE: Partial<TScatterBasicConfigItemStyle> = {
  borderType: 'solid',
  borderWidth: 0,
  shadow: {
    vShadow: 0,
    hShadow: 0,
    color: {
      r: 255,
      g: 255,
      b: 255,
      a: 0.3,
    },
    blur: 10,
  },
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TScatterBasicConfig> =
    {
      interactive: {
        base: [],
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
          value: [...DEFAULT_VALUE],
        },
        filter: {
          map: [
            {
              field: 'name',
              map: '',
              description: '数据项',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'number',
            },
            {
              field: 's',
              map: '',
              description: '系列',
              id: 's',
              type: 'string',
            },
          ],
        },
      },
      options: {
        grid: {
          ...DEFAULT_GRID_CONFIG,
        },
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
          show: false,
        },
        xAxis: DEFAULT_X_AXIS_CONFIG,
        yAxis: DEFAULT_Y_AXIS_CONFIG,
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          itemStyle: [],
          symbol: 'circle',
          symbolSize: 1,
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TScatterBasicConfig> =
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
    options: TScatterBasicConfig,
    forceSeries = false,
  ) => {
    const itemStyleList = options.series.itemStyle;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      series: {
        itemStyle: (itemStyleList.length || !forceSeries
          ? itemStyleList
          : colorList
        ).map((_, index) => {
          const item = itemStyleList[index] || DEFAULT_ITEM_STYLE;
          return {
            ...item,
            color: colorList[index] || item.color,
            shadow: {
              ...item.shadow,
              color: {
                ...colorList[index],
                a: item.shadow?.color?.a || 0.3,
              },
            },
            borderColor: {
              ...colorList[index],
              a: item.borderColor?.a || 0.3,
            },
          };
        }),
      },
    };
  },
};
