import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TClockGaugeConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TClockGaugeConfig> =
    {
      interactive: {
        base: [],
      },
      data: {
        request: {
          value: {},
          valueType: 'object',
        },
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        series: {
          center: [50, 50],
          radius: 75,
          axisLine: {
            lineStyle: {
              width: 10,
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          splitLine: {
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: 0.4,
            },
            width: 3,
            length: 10,
          },
          axisTick: {
            show: true,
            length: 6,
            lineStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
              width: 1,
            },
          },
          axisLabel: {
            show: true,
            distance: 15,
            ...DEFAULT_FONT_CONFIG,
          },
          hourPointer: {
            length: 55,
            width: 12,
            itemStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          minutePointer: {
            length: 70,
            width: 8,
            itemStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          secondPointer: {
            length: 85,
            width: 4,
            itemStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          minuteAnchor: {
            itemStyle: {
              borderWidth: 15,
              borderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          secondAnchor: {
            size: 15,
            itemStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TClockGaugeConfig> =
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
    options: TClockGaugeConfig,
    forceSeries = false,
  ) => {
    return {
      series: {
        axisLine: {
          lineStyle: {
            color: colorList[0],
          },
        },
        splitLine: {
          color: {
            ...options.series.splitLine.color,
            ...colorList[0],
          },
        },
        axisTick: {
          lineStyle: {
            color: colorList[0],
          },
        },
        hourPointer: {
          itemStyle: {
            color: colorList[0],
          },
        },
        minutePointer: {
          itemStyle: {
            color: colorList[0],
          },
        },
        secondPointer: {
          itemStyle: {
            color: colorList[0],
          },
        },
        minuteAnchor: {
          itemStyle: {
            borderColor: colorList[0],
          },
        },
        secondAnchor: {
          itemStyle: {
            color: colorList[0],
          },
        },
      },
    };
  },
};
