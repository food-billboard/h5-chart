import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TRateConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRateConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'change',
          name: '当选中改变时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '选中值',
              _defaultValue_: false,
            },
          ],
        },
      ],
    },
    data: {
      request: {},
      filter: {
        map: [],
      },
      disabled: true,
    },
    options: {
      defaultValue: 5,
      size: 28,
      count: 5,
      allowClear: true,
      allowHalf: true,
      margin: 8,
      backgroundColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 0.1,
      },
      rateBackgroundColor: {
        r: 250,
        g: 219,
        b: 20,
      },
      shape: 'bi-star-fill',
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TRateConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 300,
          height: 80,
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
