import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
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
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_BAR_CAROUSEL_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { THorizontalBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(5);
const DEFAULT_DATE_VALUE = getNumberValue(5);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<THorizontalBarConfig> =
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
            name: '点击柱子',
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
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        yAxis: {
          ...DEFAULT_Y_AXIS_CONFIG,
        },
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
          itemStyle: {
            color: [],
          },
          carousel: {
            ...DEFAULT_BAR_CAROUSEL_CONFIG,
          },
          barWidth: 'auto',
          label: {
            show: true,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
            formatter: '{c}',
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<THorizontalBarConfig> =
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
          height: 300,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: THorizontalBarConfig,
    forceSeries = false,
  ) => {
    const itemColorList = options.series.itemStyle.color;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      series: {
        itemStyle: {
          color: (itemColorList.length || !forceSeries
            ? itemColorList
            : colorList
          ).map((item, index) => {
            return colorList[index] || item;
          }),
        },
      },
    };
  },
};
