import { omit, merge } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import { getDate, getNumberValue } from '@/utils/constants';
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
import { TLineBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_DATE_VALUE_BAR = getNumberValue(10);
const DEFAULT_DATE_VALUE_LINE = getNumberValue(10);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.reduce<any>((acc, item, index) => {
  acc.push(
    {
      x: item,
      y: DEFAULT_DATE_VALUE_BAR[index],
    },
    {
      x: item,
      y2: DEFAULT_DATE_VALUE_LINE[index],
    },
  );
  return acc;
}, []);

const DEFAULT_ITEM_STYLE = {
  line: {
    smooth: true,
    lineWidth: 1,
  },
  bar: {
    barWidth: 'auto',
  },
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TLineBarConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'click-bar',
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
                description: '柱图系列',
              },
            ],
          },
          {
            type: 'click-line',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'x',
                variable: '',
                description: 'x轴',
              },
              {
                key: 'y2',
                variable: '',
                description: 'y2轴',
              },
              {
                key: 's2',
                variable: '',
                description: '折线系列',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item-bar',
            name: '点击柱子',
          },
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item-line',
            name: '点击折线',
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
              field: 'y2',
              map: '',
              description: 'y2轴',
              id: 'y2',
              type: 'number',
            },
            {
              field: 's',
              map: '',
              description: '柱图系列',
              id: 's',
              type: 'string',
            },
            {
              field: 's2',
              map: '',
              description: '折线系列',
              id: 's2',
              type: 'string',
            },
          ],
        },
      },
      options: {
        grid: {
          ...DEFAULT_GRID_CONFIG,
        },
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        yAxis: omit(DEFAULT_Y_AXIS_CONFIG, 'position'),
        yAxis2: omit(DEFAULT_Y_AXIS_CONFIG, 'position'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          line: {
            ...DEFAULT_ANIMATION_CONFIG,
            animationDuration: 2000,
            animationEasing: 'quadraticInOut',
          },
          bar: {
            ...DEFAULT_ANIMATION_CONFIG,
            animationDuration: 2000,
            animationEasing: 'quadraticInOut',
          },
        },
        series: {
          label: {
            show: false,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          style: {
            line: {
              smooth: true,
              lineWidth: 1,
            },
            bar: {
              barWidth: 20,
              borderRadius: 20,
            },
          },
          itemStyle: DEFAULT_THEME_RADIAL_COLOR_LIST().map((item) => {
            return merge({}, DEFAULT_ITEM_STYLE, {
              line: {
                color: item.start,
                areaColor: item,
              },
              bar: {
                color: item,
              },
            });
          }),
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TLineBarConfig> =
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
    options: TLineBarConfig,
    forceSeries = false,
  ) => {
    const componentColorList = DEFAULT_THEME_RADIAL_COLOR_LIST(colorList);
    const length = componentColorList.length;
    const itemColorList = options.series.itemStyle;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      series: {
        itemStyle: (itemColorList.length || !forceSeries
          ? itemColorList
          : colorList
        ).map((_, index) => {
          const item = itemColorList[index] || DEFAULT_ITEM_STYLE;
          const color = componentColorList[index % length];
          return merge({}, item, {
            line: {
              color: color.start,
              areaColor: color,
            },
            bar: {
              color,
            },
          });
        }),
      },
    };
  },
};
