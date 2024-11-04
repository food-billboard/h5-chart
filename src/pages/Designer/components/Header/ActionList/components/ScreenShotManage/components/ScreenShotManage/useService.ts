import dayjs from 'dayjs';
import { useState } from 'react';
import { message } from '@/components/Message';
import { useLocalStorage, useAnyDva } from '@/hooks';
import {
  getScreenShotList,
  addScreenShot,
  updateScreenShot,
  deleteScreenShot,
  useScreenShot,
  coverScreenShot,
} from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MAX_SCREEN_SHOT_COUNT } from '@/utils/constants';

// 区分improve 和 static
const useService = ({ screen }: { screen: string }) => {
  const { getState } = useAnyDva();

  const [localDataSource = {}, setLocalDataSource, getLocalDataSource] =
    useLocalStorage<API_SCREEN.LocalScreenShotData>(
      LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
      {},
    );

  const [dataSource, setDataSource] = useState<
    API_SCREEN.GetScreenShotListData[]
  >([]);

  // 获取数据
  const fetchData = async () => {
    if (GlobalConfig.IS_STATIC) {
      // ? 不需要获取数据，直接从本地storage拿
    } else {
      const result = await getScreenShotList({ _id: screen });
      setDataSource(result || []);
    }
  };

  // 新增
  const onAdd = async (callback: any = fetchData) => {
    if (GlobalConfig.IS_STATIC) {
      try {
        const { screenData, components, version } = getState().global;
        const localDataSource = getLocalDataSource() || {};
        if (MAX_SCREEN_SHOT_COUNT <= localDataSource[screen]?.length) {
          return message.info('超过快照生成最大数量');
        }
        await setLocalDataSource({
          ...localDataSource,
          [screen]: [
            ...(localDataSource[screen] || []),
            {
              _id: Date.now().toString(),
              created: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              user: '',
              description: '',
              isUse: false,
              value: {
                ...screenData,
                components,
              } as ComponentData.TScreenData,
              version,
            },
          ],
        });
      } catch (err) {
        console.error(err);
        message.info('快照生成失败');
      }
    } else {
      await addScreenShot({ _id: screen });
    }
    callback();
  };

  // 更新
  const onUpdate = async (
    { value, _id }: { value: string; _id: string },
    callback: any = fetchData,
  ) => {
    if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).map((item) => {
            if (item._id === _id) {
              return {
                ...item,
                description: value,
              };
            }
            return item;
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    } else {
      await updateScreenShot({ screen, _id, description: value });
    }
    callback();
  };

  // 删除
  const onDelete = async (
    { _id }: { _id: string },
    callback: any = fetchData,
  ) => {
    if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).filter((item) => {
            return item.isUse || item._id !== _id;
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    } else {
      await deleteScreenShot({ screen, _id });
    }
    callback();
  };

  // 使用
  const onUse = async ({ _id }: { _id: string }, callback: any = fetchData) => {
    if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).map((item) => {
            return {
              ...item,
              isUse: item._id === _id,
            };
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    } else {
      await useScreenShot({ screen, _id });
    }
    callback();
  };

  // 覆盖
  const onCover = async (
    { _id }: { _id: string },
    callback: any = fetchData,
  ) => {
    if (GlobalConfig.IS_STATIC) {
      try {
        const { screenData, components, version } = getState().global;
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).map((item) => {
            if (item._id === _id) {
              return {
                ...item,
                version,
                value: {
                  ...screenData,
                  components,
                } as ComponentData.TScreenData,
              };
            }
            return item;
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    } else {
      await coverScreenShot({ screen, _id });
    }
    callback();
  };

  return {
    fetchData,
    onAdd,
    onUpdate,
    onDelete,
    onUse,
    onCover,
    dataSource: GlobalConfig.IS_STATIC
      ? localDataSource[screen] || []
      : dataSource,
  };
};

export default useService;
