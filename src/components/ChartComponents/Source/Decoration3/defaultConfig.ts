import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TDecoration3Config } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TDecoration3Config> =
    {
      interactive: {
        base: [],
        linkage: [],
      },
      data: {
        request: {},
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        color: [
          ThemeUtil.generateNextColor4CurrentTheme(0),
          ThemeUtil.generateNextColor4CurrentTheme(1),
        ],
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TDecoration3Config> =
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
          height: 100,
          border: {
            disabled: true,
          },
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: TDecoration3Config,
    forceSeries = false,
  ) => {
    return {
      color: [colorList[0], colorList[1]],
    };
  },
};
