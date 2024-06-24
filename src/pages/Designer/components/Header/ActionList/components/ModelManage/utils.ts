import { useAnyDva } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { MODEL_BASE_DATA } from './components/ModelList/constant';

export function changeComponentsPositionAccordingModel(config?: {
  model?: string;
  components?: ComponentData.TComponentData[];
}) {
  let model = config?.model;
  let components = config?.components;
  if (!model || !components) {
    const { getState } = useAnyDva();
    const globalData = getState().global;
    if (!components) components = globalData.components;
    if (!model) model = globalData.screenData.config.attr.model.value || '';
  }
  if (!model) return;
  const modelGridValue =
    MODEL_BASE_DATA.find((item) => item.key === model)?.gridValue || [];
  const blockCenterList =
    modelGridValue.reduce<
      {
        left: number;
        top: number;
      }[]
    >((acc, item) => {
      acc.push(
        ...item.map((item) => {
          return {
            left: item.left + item.width / 2,
            top: item.top + item.height / 2,
          };
        }),
      );
      return acc;
    }, []) || [];

  const actions: ComponentMethod.SetComponentMethodParamsData[] =
    components.map((component, index) => {
      const {
        id,
        config: {
          style: { left, top, width, height },
        },
      } = component;

      // 找出距离最近的区块
      const componentCenter = {
        left: left + width / 2,
        top: top + height / 2,
      };

      const targetBlock = blockCenterList.reduce(
        (acc, cur) => {
          const xDistance = Math.abs(componentCenter.left - cur.left);
          const yDistance = Math.abs(componentCenter.top - cur.top);
          const distance = Math.sqrt(
            xDistance * xDistance + yDistance * yDistance,
          );
          const currentXDistance = Math.abs(componentCenter.left - acc.left);
          const currentYDistance = Math.abs(componentCenter.top - acc.top);
          const currentDistance = Math.sqrt(
            currentXDistance * currentXDistance +
              currentYDistance * currentYDistance,
          );
          if (distance < currentDistance) {
            return cur;
          }
          return acc;
        },
        {
          left: 99999,
          top: 99999,
        },
      );

      return {
        value: {
          config: {
            style: {
              left: targetBlock.left - width / 2,
              top: targetBlock.top - height / 2,
            },
          },
        },
        id,
        path: index.toString(),
        action: 'update',
      };
    });
  DataChangePool.setComponent(actions);
}
