import { merge } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
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
import { TWaterFallBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_DATE_VALUE = getNumberValue(10);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TWaterFallBarConfig> =
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
          ],
        },
      },
      options: {
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        grid: {
          ...DEFAULT_GRID_CONFIG,
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
          label: {
            show: false,
            position: 'inside',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          itemStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST()[0],
          },
          barWidth: 20,
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TWaterFallBarConfig> =
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
    options: TWaterFallBarConfig,
    forceSeries = false,
  ) => {
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
          color: colorList[0],
        },
      },
    };
  },
};
