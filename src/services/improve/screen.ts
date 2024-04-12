import { merge } from 'lodash';
import { isModelHash, useAnyDva } from '@/hooks';
import { getLocationQuery } from '../../utils';
import { SCREEN_VERSION, SERVICE_REQUEST_URL } from '../../utils/constants';
import request from '../../utils/request';

const { REACT_APP_ENV } = process.env;

// 新增大屏
export const postScreen4Improve = (data: API_SCREEN.TAddScreenParams) => {
  return request('/api/screen/list', {
    method: 'POST',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 修改大屏
export const putScreen4Improve = (data: API_SCREEN.TEditScreenParams) => {
  return request('/api/screen/list', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 链式修改大屏
export const putScreenPool4Improve = (
  data: API_SCREEN.TEditScreenPoolParams,
) => {
  return request('/api/screen/list/pool', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 创建大屏编辑
export const createPutScreenPool4Improve = (
  data: API_SCREEN.TCreateScreenPoolParams,
) => {
  return request('/api/screen/list/pool', {
    method: 'POST',
    data,
  });
};

// 大屏编辑状态验证
export const putScreenPoolValid4Improve = (params: { _id: string }) => {
  return request('/api/screen/list/pool', {
    method: 'GET',
    params,
  });
};

// 关闭大屏编辑流
// 关闭大屏编辑流
export const deleteScreenPool4Improve = (
  sync: boolean = false,
  customParams?: Partial<{ _id: string; type: string }>,
) => {
  const { id } = getLocationQuery() || {};
  const { getState } = useAnyDva();
  const userId = getState().user.currentUser._id;

  let params = {
    type: isModelHash(location.hash) ? 'model' : 'screen',
    _id: id,
    user: userId,
  };
  params = merge({}, params, customParams);
  const url = '/api/screen/list/pool/close';

  if (sync)
    return request(url, {
      method: 'POST',
      data: params,
    });

  const data = new Blob([JSON.stringify(params)], {
    type: 'text/plain',
  });
  navigator.sendBeacon(url, data);
};

// 大屏详情
export const getScreenDetail4Improve = (
  params: API_SCREEN.TGetScreenDetail,
) => {
  return request<API_SCREEN.TScreenDetail>('/api/screen/detail', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenList4Improve = (
  params: API_SCREEN.TGetScreenListParams,
) => {
  const { currPage, pageSize, ...nextParams } = params;
  return request<any>('/api/collections/screen/records', {
    method: 'GET',
    params: {
      ...nextParams,
      page: currPage,
      perPage: pageSize,
    },
    improve: true,
  });
  return request<any>('/api/screen/list', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏删除
export const deleteScreen4Improve = (
  params: API_SCREEN.TDeleteScreenParams,
) => {
  return request('/api/screen/list', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreen4Improve = (
  data: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/preview', {
    method: 'POST',
    data,
  });
};

// 大屏预览验证
export const previewScreenValid4Improve = (
  params: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏复制 | 大屏模板使用
export const copyScreen4Improve = (data: {
  _id: string;
  type: 'screen' | 'model';
}) => {
  return request('/api/screen/copy', {
    method: 'POST',
    data,
  });
};

// 大屏设置有效时间
// 分享
// 设置公共或加密
// 设置有效时间
export const shareScreen4Improve = (data: API_SCREEN.TShareScreenParams) => {
  return request('/api/screen/share', {
    method: 'POST',
    data,
  });
};

// 大屏分享关闭
export const closeShareScreen4Improve = (
  params: API_SCREEN.TCloseShareScreenParams,
) => {
  return request('/api/screen/share', {
    method: 'DELETE',
    params,
  });
};

// 大屏分享心跳检测
export const shareScreenHeartbeat4Improve = (
  params: API_SCREEN.TShareScreenHeartbeatParams,
) => {
  return request('/api/screen/share', {
    method: 'GET',
    params,
  });
};

// 大屏分享权限信息获取
export const shareScreenGet4Improve = (
  params: API_SCREEN.TShareScreenGetParams,
) => {
  return request<API_SCREEN.TShareScreenGetData>('/api/screen/share/valid', {
    method: 'GET',
    params,
    mis: false,
  });
};

// 大屏分享权限验证
export const shareScreenPost4Improve = (
  data: API_SCREEN.TShareScreenPostParams,
) => {
  return request('/api/screen/share/valid', {
    method: 'POST',
    data: {
      ...data,
      env: REACT_APP_ENV || 'prod',
    },
  });
};

// 大屏启用
export const enableScreen4Improve = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/api/screen/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreen4Improve = (
  params: API_SCREEN.TDisabledScreenParams,
) => {
  return request('/api/screen/enable', {
    method: 'DELETE',
    params,
  });
};

// 服务端代理数据请求
export const preRequestData4Improve = (
  data: API_SCREEN.TPreRequestDataParams,
) => {
  return request(SERVICE_REQUEST_URL, {
    method: 'POST',
    data,
  });
};

// 大屏导入
export const postScreenLeadIn4Improve = (
  data: API_SCREEN.TPreLeadInDataParams,
) => {
  return request('/api/screen/pre/leadin', {
    method: 'POST',
    data,
  });
};

// 大屏导出
export const postScreenExport4Improve = (
  data: API_SCREEN.TPreExportDataParams,
) => {
  return request('/api/screen/pre/export', {
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    origin: true,
  });
};

// 快照列表
export async function getScreenShotList(
  params: API_IMPROVE.GetScreenShotListParams,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
    improve: true,
  });
}

// 当前快照详情
export async function getCurrentScreenShotData(
  params: API_SCREEN.TGetScreenDetail,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
    improve: true,
  });
}

// 删除快照
export async function deleteScreenShot(params: {
  _id: string;
  screen: string;
}) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
    improve: true,
  });
}

// 更新快照
export async function updateScreenShot(data: API_IMPROVE.UpdateScreenShotData) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// 新增快照
export async function addScreenShot(data: { _id: string }) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// 使用快照
export async function useScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// 覆盖快照
export async function coverScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}
