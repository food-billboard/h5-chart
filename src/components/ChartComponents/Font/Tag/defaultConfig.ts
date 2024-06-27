import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getText } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TTagConfig } from './type';

const DEFAULT_TEXT = getText(4);

const DEFAULT_VALUE = DEFAULT_TEXT.map((item) => {
  return {
    value: item,
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTagConfig> = {
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
              description: '内容',
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
            field: 'icon',
            map: '',
            description: '图标',
            id: 'icon',
            type: 'string',
          },
          {
            field: 'value',
            map: '',
            description: '内容',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      margin: 8,
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
      },
      series: DEFAULT_THEME_COLOR_LIST().map((item) => {
        return {
          color: item,
        };
      }),
      icon: {
        position: 'start',
        margin: 8,
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTagConfig> =
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
          height: 200,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: TTagConfig,
    forceSeries = false,
  ) => {
    const list = options.series;
    return {
      series: (list.length || !forceSeries ? list : colorList).map(
        (item, index) => {
          return {
            color: colorList[index] || item,
          };
        },
      ),
    };
  },
};
