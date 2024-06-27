import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getName, getNumberValue } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TRadarBasicConfig } from './type';

const MIN = 20;
const MAX = 100;

const DEFAULT_NAME_LABEL = getName(7);
const DEFAULT_DATE_VALUE = getNumberValue(7, MIN, MAX);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
    max: MAX,
  };
});

const DEFAULT_LINE_STYLE = {
  width: 1,
  type: 'solid',
};

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadarBasicConfig> =
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
          value: DEFAULT_VALUE,
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
              field: 'max',
              map: '',
              description: '最大值',
              id: 'max',
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
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        radar: {
          center: [50, 50],
          radius: 75,
          axisName: {
            show: true,
            formatter: '{value}',
            ...DEFAULT_FONT_CONFIG,
          },
          axisNameGap: 15,
          splitNumber: 5,
          shape: 'polygon',
          axisLine: {
            show: false,
            lineStyle: {
              color: DEFAULT_THEME_COLOR_LIST_DATA[0],
              width: 1,
              type: 'solid',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.4,
              },
              width: 1,
              type: 'solid',
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                {
                  ...DEFAULT_THEME_COLOR_LIST_DATA[0],
                  a: 0.3,
                },
                {
                  ...DEFAULT_THEME_COLOR_LIST_DATA[1],
                  a: 0.3,
                },
              ],
            },
          },
        },
        series: {
          label: {
            show: false,
            position: 'top',
            distance: 5,
            formatter: '{b}: {c}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          itemStyle: {
            color: [],
          },
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: [],
          areaStyle: {
            color: [],
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRadarBasicConfig> =
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
    options: TRadarBasicConfig,
    forceSeries = false,
  ) => {
    const itemStyleColorList = options.series.itemStyle.color;
    const lineStyleColorList = options.series.lineStyle;
    const areaStyleColorList = options.series.areaStyle.color;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      radar: {
        axisLine: {
          lineStyle: {
            color: colorList[0],
          },
        },
        splitLine: {
          lineStyle: {
            color: {
              ...colorList[0],
              a: options.radar.splitLine.lineStyle.color.a,
            },
          },
        },
        splitArea: {
          areaStyle: {
            color: [
              {
                ...colorList[0],
                a: options.radar.splitArea.areaStyle.color[0].a,
              },
              {
                ...colorList[1],
                a: options.radar.splitArea.areaStyle.color[1].a,
              },
            ],
          },
        },
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
        lineStyle: (lineStyleColorList.length || !forceSeries
          ? lineStyleColorList
          : colorList
        ).map((item, index) => {
          return {
            ...(lineStyleColorList[index] || DEFAULT_LINE_STYLE),
            color: colorList[index] || lineStyleColorList[index]?.color,
          };
        }),
        areaStyle: {
          color: (areaStyleColorList.length || !forceSeries
            ? areaStyleColorList
            : colorList
          ).map((item, index) => {
            return colorList[index] || item;
          }),
        },
      },
    };
  },
};
