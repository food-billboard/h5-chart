import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import { getText } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TStateCardConfig } from './type';

const DEFAULT_TEXT = getText(4);

const DEFAULT_VALUE = new Array(4).fill(0).map((item, index) => {
  return {
    name: DEFAULT_TEXT[index],
    value: (index + 1).toString(),
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TStateCardConfig> =
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
                description: '内容',
              },
              {
                key: 'value',
                variable: '',
                description: '状态',
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
              description: '内容',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '状态',
              id: 'value',
              type: 'string',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        margin: 20,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
        },
        stateList: new Array(4).fill(0).map((item, index) => {
          return {
            value: (index + 1).toString(),
            stateIcon: {
              color: ThemeUtil.generateNextColor4CurrentTheme(index),
            },
          };
        }),
        stateIcon: {
          position: 'start',
          borderRadius: 50,
          rotate: 0,
          margin: 8,
          size: [20, 20],
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TStateCardConfig> =
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
    options: TStateCardConfig,
    forceSeries = false,
  ) => {
    return {
      stateList: (options.stateList.length || !forceSeries
        ? options.stateList
        : colorList
      ).map((item, index) => {
        return {
          value: options.stateList[index]?.value || index.toString(),
          stateIcon: {
            color:
              colorList[index] || options.stateList[index]?.stateIcon?.color,
          },
        };
      }),
    };
  },
};
