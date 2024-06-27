import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TSwitchConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TSwitchConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'change',
          name: '当状态改变时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '状态',
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
      offColor: {
        r: 136,
        g: 136,
        b: 136,
      },
      onColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      offHandleColor: {
        r: 255,
        g: 255,
        b: 255,
      },
      onHandleColor: {
        r: 255,
        g: 255,
        b: 255,
      },
      uncheckedIcon: {
        show: true,
        value: '关闭',
        type: 'text',
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
      checkedIcon: {
        show: true,
        type: 'text',
        value: '开启',
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
      boxShadow: {
        hShadow: 0,
        vShadow: 0,
        blur: 2,
        spread: 3,
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      activeBoxShadow: {
        hShadow: 0,
        vShadow: 0,
        blur: 2,
        spread: 3,
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      defaultChecked: true,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TSwitchConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 100,
          height: 50,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (
    colorList: ComponentData.TColorConfig[],
    options: TSwitchConfig,
    forceSeries = false,
  ) => {
    return {
      onColor: colorList[0],
      boxShadow: {
        color: colorList[0],
      },
      activeBoxShadow: {
        color: colorList[0],
      },
    };
  },
};
