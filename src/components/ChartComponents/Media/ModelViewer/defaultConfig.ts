import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TModelConfig } from './type';

const DEFAULT_VALUE = {
  value: 'https://modelviewer.dev/shared-assets/models/shishkebab.glb',
  poster: 'https://modelviewer.dev/assets/poster-shishkebab.webp',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TModelConfig> = {
    interactive: {
      base: [],
      linkage: [],
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
            description: '模型地址(支持"gltf"、"glb")',
            id: 'value',
            type: 'string',
          },
          {
            field: 'poster',
            map: '',
            description: '模型占位图片',
            id: 'poster',
            type: 'string',
          },
        ],
      },
    },
    options: {
      progress: {
        from: ThemeUtil.generateNextColor4CurrentTheme(0),
        to: ThemeUtil.generateNextColor4CurrentTheme(1),
      },
      rotate: {
        show: true,
        delay: 3000,
        speed: 30,
      },
      cameraControls: {
        show: true,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      animation: {
        name: '',
      },
      scale: 1,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TModelConfig> =
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
    options: TModelConfig,
    forceSeries = false,
  ) => {
    return {
      progress: {
        from: colorList[0],
        to: colorList[1],
      },
    };
  },
};
