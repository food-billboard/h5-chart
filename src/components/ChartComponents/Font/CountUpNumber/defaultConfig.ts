import { mergeWithoutArray } from '@/utils';
import { getNumberValue } from '@/utils/constants';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TCountUpNumberConfig } from './type';

const [DEFAULT_NUMBER_VALUE] = getNumberValue(1, 2000, 200000);

const DEFAULT_VALUE = {
  value: DEFAULT_NUMBER_VALUE,
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TCountUpNumberConfig> =
    {
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
                description: '数据值',
              },
            ],
          },
        ],
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
          valueType: 'object',
        },
        filter: {
          map: [
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'number',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        align: {
          horizontal: 'flex-start',
          vertical: 'center',
        },
        animation: {
          duration: 2,
          easingFn: 'easeOutExpo',
        },
        addonBefore: {
          show: true,
          content: '￥',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
        },
        addonAfter: {
          show: true,
          content: '元',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
        },
        thousands: {
          show: true,
          content: ',',
        },
        round: {
          show: false,
          length: 0,
        },
        decimal: '.',
        fontStyle: 'digital-number',
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TCountUpNumberConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 200,
          height: 40,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: ComponentData.TColorConfig[]) => {
    return {};
  },
};
