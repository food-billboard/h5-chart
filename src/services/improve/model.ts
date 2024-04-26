import { merge } from 'lodash';
import { isModelHash } from '@/hooks';
import { getLocationQuery } from '../../utils';
import {
  SCREEN_MODEL_VERSION,
  SERVICE_REQUEST_URL,
} from '../../utils/constants';
import PocketBase, {
  parseFilter,
  getUserInfo,
} from '../../utils/pocketBaseRequest';
import request from '../../utils/request';

// 已完成
// 新增大屏模板
export const postScreenModel4Improve = (data: API_SCREEN.TAddScreenParams) => {
  return PocketBase.collection('model')
    .create({
      ...data,
      user: getUserInfo(),
      version: SCREEN_MODEL_VERSION(),
    })
    .then((data) => data.id);
};

// 修改大屏模板
export const putScreenModel4Improve = (data: API_SCREEN.TEditScreenParams) => {
  const { _id, ...nextData } = data;
  return PocketBase.collection('model').update(_id, {
    ...nextData,
    user: getUserInfo(),
    version: SCREEN_MODEL_VERSION(),
  });
};

// 大屏模板详情
export const getScreenModelDetail4Improve = (
  params: API_SCREEN.TGetScreenDetail,
) => {
  const { _id } = params;
  return PocketBase.collection('model')
    .getOne<API_SCREEN.TScreenDetail & { id: string; data: string }>(_id)
    .then((data) => {
      const { data: screenData, id, ...nextData } = data;
      return {
        ...nextData,
        _id: id,
        components: screenData,
      } as API_SCREEN.TScreenDetail;
    });
};

// 大屏模板列表
export const getScreenModelList4Improve = (
  params: API_SCREEN.TGetScreenListParams,
) => {
  const { currPage, pageSize, content, flag } = params;
  return PocketBase.collection('model').getList<API_IMPROVE.ResponseListData>(
    currPage,
    pageSize,
    {
      filter: parseFilter([
        {
          key: 'flag',
          value: flag,
          operator: '=',
        },
        {
          key: 'name',
          value: content,
          operator: '~',
        },
        {
          key: 'description',
          value: content,
          operator: '~',
        },
      ]),
      fields: 'id,description,name,flag,poster,enable',
    },
  );
};

// 大屏模板删除
export const deleteScreenModel4Improve = (
  params: API_SCREEN.TDeleteScreenParams,
) => {
  return PocketBase.collection('model').delete(params._id);
};

// 大屏模板启用
export const enableScreenModel4Improve = (
  data: API_SCREEN.TEnableScreenParams,
) => {
  return PocketBase.collection('model').update(data._id, {
    enable: true,
  });
};

// 大屏模板禁用
export const disabledScreenModel4Improve = (
  params: API_SCREEN.TDisabledScreenParams,
) => {
  return PocketBase.collection('model').update(params._id, {
    enable: false,
  });
};

// 未完成

// 链式修改大屏
export const putScreenModelPool4Improve = (
  data: API_SCREEN.TEditScreenPoolParams,
) => {
  return request('/api/screen/list/pool/model', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_MODEL_VERSION(),
    },
  });
};

// 大屏模板预览
export const previewScreenModel4Improve = (
  data: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/model/preview', {
    method: 'POST',
    data,
  });
};

// 大屏模板预览验证
export const previewScreenModelValid4Improve = (
  params: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/model/preview/valid', {
    method: 'GET',
    params,
  });
};
