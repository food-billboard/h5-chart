import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getName, getNumberValue } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { TTreeBasicConfig } from './type';

const DEFAULT_NAME_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5);

const DEFAULT_VALUE = [
  {
    name: '根节点',
    value: 0,
    children: DEFAULT_NAME_LABEL.map((item, index) => {
      const DEFAULT_SUB_NAME_LABEL = getName(3);
      const DEFAULT_SUB_DATE_VALUE = getNumberValue(3);
      return {
        name: item,
        value: DEFAULT_DATE_VALUE[index],
        children: new Array(3).fill(0).map((_, index) => {
          return {
            name: DEFAULT_SUB_NAME_LABEL[index],
            value: DEFAULT_SUB_DATE_VALUE[index],
          };
        }),
      };
    }),
  },
];

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTreeBasicConfig> =
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
                description: '数据项',
              },
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
              field: 'children',
              map: '',
              description: '子节点',
              id: 'children',
              type: 'array[]',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
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
          layout: 'radial',
          orient: 'LR',
          symbol: 'circle',
          symbolSize: '-20',
          defaultSymbolSize: 70,
          label: {
            show: true,
            formatter: '{b}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          labelLayout: {
            hideOverlap: false,
            // moveOverlap: 'shiftX',
            // draggable: true
          },
          itemStyle: {
            color: DEFAULT_THEME_COLOR_LIST(),
          },
          lineStyle: {
            width: 1,
            curveness: 0.5,
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TTreeBasicConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 600,
          height: 600,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: TTreeBasicConfig,
    forceSeries = false,
  ) => {
    const itemStyleList = options.series.itemStyle.color;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG(colorList).backgroundColor,
      },
      series: {
        itemStyle: {
          color: (itemStyleList.length || !forceSeries
            ? itemStyleList
            : colorList
          ).map((item, index) => {
            return colorList[index] || item;
          }),
        },
      },
    };
  },
};
