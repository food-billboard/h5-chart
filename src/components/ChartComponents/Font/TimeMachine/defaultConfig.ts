import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TTimeMachineConfig } from './type';

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTimeMachineConfig> =
  {
    interactive: {
      base: [],
    },
    data: {
      request: {
        value: {
          value: Date.now().toString(),
        },
        valueType: 'object',
      },
      filter: {
        map: [],
      },
    },
    options: {
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        fontSize: 24,
      },
      icon: {
        show: false,
        value: 'bi-clock',
        position: 'before',
        size: 24,
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
        margin: 4,
      },
      formatter: 'YYYY-MM-DD HH:mm:ss',
    },
  };

const DefaultConfig: ComponentData.TComponentData<TTimeMachineConfig> =
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
        height: 40,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
