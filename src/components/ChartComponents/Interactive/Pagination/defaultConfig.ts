import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TPaginationConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPaginationConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'page_change',
            name: '当页数发生变化时',
            fields: [
              {
                key: 'current',
                variable: '',
                description: '当前分页',
              },
              {
                key: 'pageSize',
                variable: '',
                description: '每页数量',
              },
              {
                key: 'total',
                variable: '',
                description: '总数',
              },
            ],
          },
        ],
        linkage: [],
      },
      data: {
        request: {
          value: {
            total: 100,
            current: 2,
            pageSize: 10,
            disabled: [],
          },
          valueType: 'object',
        },
        filter: {
          map: [
            {
              field: 'total',
              map: '',
              description: '分页数据总数',
              id: 'total',
              type: 'number',
            },
            {
              field: 'current',
              map: '',
              description: '当前分页',
              id: 'current',
              type: 'number',
            },
            {
              field: 'pageSize',
              map: '',
              description: '每页条数',
              id: 'pageSize',
              type: 'number',
            },
          ],
        },
      },
      options: {
        borderRadius: DEFAULT_BORDER_RADIUS,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
        },
        margin: 8,
        border: {
          width: 1,
          color: {
            r: 210,
            g: 210,
            b: 210,
          },
          type: 'solid',
        },
        backgroundColor: {
          r: 38,
          g: 44,
          b: 51,
        },
        active: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
          border: {
            width: 1,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
            type: 'solid',
          },
          backgroundColor: {
            r: 38,
            g: 44,
            b: 51,
          },
        },
        total: {
          show: false,
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
          margin: 4,
        },
        pageButton: {
          type: 'icon',
          value: ['bi-chevron-left', 'bi-chevron-right'],
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          backgroundColor: {
            r: 38,
            g: 44,
            b: 51,
          },
          size: 12,
          border: {
            show: true,
          },
        },
        pageNumChanger: {
          show: false,
          pageEnum: '10/20/30/40/50',
          arrow: {
            size: 12,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        skip: {
          show: true,
          margin: 4,
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPaginationConfig> =
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
    options: TPaginationConfig,
    forceSeries = false,
  ) => {
    return {
      active: {
        textStyle: {
          color: colorList[0],
        },
        border: {
          color: colorList[0],
        },
      },
      pageButton: {
        color: colorList[0],
      },
      pageNumChanger: {
        arrow: {
          color: colorList[0],
        },
      },
    };
  },
};
