import { omit, merge } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue, getSeries } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_X_AXIS_CONFIG,
  DEFAULT_Y_AXIS_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TRadialLineConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_SERIES = getSeries(2);

export const DEFAULT_DECAL = {
  symbol: 'circle',
  symbolSize: 4,
};

export const DEFAULT_LINE_STYLE: {
  width: number;
  type: ComponentData.ComponentLineStyle;
} = {
  width: 1,
  type: 'solid',
};

const DEFAULT_VALUE = DEFAULT_SERIES.reduce<any>((acc, cur) => {
  const DEFAULT_DATE_VALUE = getNumberValue(10);
  acc.push(
    ...DEFAULT_DATE_LABEL.map((item, index) => {
      return {
        x: item,
        y: DEFAULT_DATE_VALUE[index],
        s: cur,
      };
    }),
  );
  return acc;
}, []);

export default () => {
  const DEFAULT_THEME_RADIAL_COLOR_LIST_DATA =
    DEFAULT_THEME_RADIAL_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadialLineConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'click',
            name: '当点击项时',
            fields: [
              {
                key: 'x',
                variable: '',
                description: 'x轴',
              },
              {
                key: 'y',
                variable: '',
                description: 'y轴',
              },
              {
                key: 's',
                variable: '',
                description: '系列',
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
              field: 'x',
              map: '',
              description: 'x轴',
              id: 'x',
              type: 'string',
            },
            {
              field: 'y',
              map: '',
              description: 'y轴',
              id: 'y',
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
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        yAxis: merge({}, DEFAULT_Y_AXIS_CONFIG, {
          splitLine: {
            show: false,
            lineStyle: {
              width: 1,
              type: 'solid' as any,
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.4,
              },
            },
          },
        }),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          smooth: false,
          label: {
            show: false,
            position: 'inside',
            rotate: 0,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          itemStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.map((_, index) => {
              return ThemeUtil.generateNextColor4CurrentTheme(index);
            }),
            decal: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.map((_, index) => {
              return DEFAULT_DECAL;
            }) as any,
          },
          areaStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.map((_, index) => {
              return {
                ...ThemeUtil.generateNextColor4CurrentTheme(index),
                a: 0,
              };
            }),
          },
          lineStyle: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.map((item) => {
            return {
              ...DEFAULT_LINE_STYLE,
              color: item,
            };
          }),
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRadialLineConfig> =
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
    options: TRadialLineConfig,
    forceSeries = false,
  ) => {
    const DEFAULT_THEME_RADIAL_COLOR_LIST_DATA =
      DEFAULT_THEME_RADIAL_COLOR_LIST(colorList);
    const length = DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.length;
    const itemStyleColorList = options.series.itemStyle.color;
    const areaStyleColorList = options.series.areaStyle.color;
    const lineStyleColorList = options.series.lineStyle;
    return {
      yAxis: {
        splitLine: {
          lineStyle: {
            color: {
              ...colorList[0],
              a: options.yAxis.splitLine.lineStyle.color.a,
            },
          },
        },
      },
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      series: {
        itemStyle: {
          color: (itemStyleColorList.length || !forceSeries
            ? itemStyleColorList
            : colorList
          ).map((item, index) => {
            return colorList[index] || item;
          }),
        },
        areaStyle: {
          color: (areaStyleColorList.length || !forceSeries
            ? areaStyleColorList
            : colorList
          ).map((item, index) => {
            return colorList[index] || item;
          }),
        },
        lineStyle: (lineStyleColorList.length || !forceSeries
          ? lineStyleColorList
          : DEFAULT_THEME_RADIAL_COLOR_LIST_DATA
        ).map((_, index) => {
          const item = lineStyleColorList[index] || DEFAULT_LINE_STYLE;
          return {
            ...item,
            color: {
              ...(item.color || DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[0]),
              start: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[index % length].start,
              end: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[index % length].end,
            },
          };
        }),
      },
    };
  },
};
