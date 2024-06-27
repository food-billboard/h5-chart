import { merge } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import { getName } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_RADIAL_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TPercentBarConfig } from './type';

const DEFAULT_NAME = getName(3);
const DEFAULT_Y_VALUE = [20, 30, 50];

const DEFAULT_VALUE = DEFAULT_NAME.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_Y_VALUE[index],
  };
});

export const DEFAULT_LABEL = {
  show: true,
  formatter: {
    name: {
      show: true,
      ...DEFAULT_FONT_CONFIG,
      fontWeight: 'bold',
      color: {
        r: 255,
        g: 255,
        b: 255,
      },
    },
    value: {
      show: true,
      ...DEFAULT_FONT_CONFIG,
      fontWeight: 'bold',
      color: {
        r: 255,
        g: 255,
        b: 255,
      },
      addonAfter: {
        show: true,
        value: '%',
      },
    },
  },
};

const DEFAULT_SERIES_ITEM_STYLE = {
  label: DEFAULT_LABEL,
  color: DEFAULT_RADIAL_CONFIG,
};

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPercentBarConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'click',
            name: '当点击项时',
            fields: [
              {
                key: 'name',
                variable: '',
                description: '名称',
              },
              {
                key: 'value',
                variable: '',
                description: '值',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item',
            name: '点击项',
          },
        ],
      },
      data: {
        request: {
          value: DEFAULT_VALUE,
        },
        filter: {
          map: [
            {
              field: 'name',
              map: '',
              description: '名称',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '值',
              id: 'value',
              type: 'number',
            },
          ],
        },
      },
      options: {
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
        },
        grid: {
          ...DEFAULT_GRID_CONFIG,
          left: 40,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          itemStyle: new Array(3).fill(0).map((_, index) => {
            return merge({}, DEFAULT_SERIES_ITEM_STYLE, {
              color: {
                start: DEFAULT_THEME_COLOR_LIST_DATA[index * 2],
                end: DEFAULT_THEME_COLOR_LIST_DATA[index * 2 + 1],
              },
            });
          }),
          barWidth: 20,
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPercentBarConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 120,
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
    options: TPercentBarConfig,
    forceSeries = false,
  ) => {
    const length = Math.floor(colorList.length / 2);
    const itemStyle = options.series.itemStyle;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      series: {
        itemStyle: (itemStyle.length || !forceSeries
          ? itemStyle
          : colorList
        ).map((_, index) => {
          const item = itemStyle[index] || DEFAULT_SERIES_ITEM_STYLE;
          return merge({}, item, {
            color: {
              start: colorList[(index % length) * 2] || item.color?.start,
              end: colorList[(index % length) * 2 + 1] || item.color?.end,
            },
          });
        }),
      },
    };
  },
};
