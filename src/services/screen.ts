import { merge } from 'lodash';
import { isModelHash, useAnyDva } from '@/hooks';
import { getLocationQuery } from '../utils';
import { SCREEN_VERSION, SERVICE_REQUEST_URL } from '../utils/constants';
import request from '../utils/request';

const { REACT_APP_ENV } = process.env;

// 新增大屏
export const postScreen = (data: API_SCREEN.TAddScreenParams) => {
  return request('/api/screen/list', {
    method: 'POST',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 修改大屏
export const putScreen = (data: API_SCREEN.TEditScreenParams) => {
  return request('/api/screen/list', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 链式修改大屏
export const putScreenPool = (data: API_SCREEN.TEditScreenPoolParams) => {
  return request('/api/screen/list/pool', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_VERSION(),
    },
  });
};

// 创建大屏编辑
export const createPutScreenPool = (
  data: API_SCREEN.TCreateScreenPoolParams,
) => {
  return request('/api/screen/list/pool', {
    method: 'POST',
    data,
  });
};

// 大屏编辑状态验证
export const putScreenPoolValid = (params: { _id: string }) => {
  return request('/api/screen/list/pool', {
    method: 'GET',
    params,
  });
};

// 关闭大屏编辑流
export const deleteScreenPool = (
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
export const getScreenDetail = (params: API_SCREEN.TGetScreenDetail) => {
  return request<API_SCREEN.TScreenDetail>('/api/screen/detail', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenList = (params: API_SCREEN.TGetScreenListParams) => {
  return request<any>('/api/screen/list', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏删除
export const deleteScreen = (params: API_SCREEN.TDeleteScreenParams) => {
  return request('/api/screen/list', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreen = (data: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/preview', {
    method: 'POST',
    data,
  });
};

// 大屏预览验证
export const previewScreenValid = (params: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏复制 | 大屏模板使用
export const copyScreen = (data: { _id: string; type: 'screen' | 'model' }) => {
  return request('/api/screen/copy', {
    method: 'POST',
    data,
  });
};

// 大屏设置有效时间
// 分享
// 设置公共或加密
// 设置有效时间
export const shareScreen = (data: API_SCREEN.TShareScreenParams) => {
  return request('/api/screen/share', {
    method: 'POST',
    data,
  });
};

// 大屏分享关闭
export const closeShareScreen = (
  params: API_SCREEN.TCloseShareScreenParams,
) => {
  return request('/api/screen/share', {
    method: 'DELETE',
    params,
  });
};

// 大屏分享心跳检测
export const shareScreenHeartbeat = (
  params: API_SCREEN.TShareScreenHeartbeatParams,
) => {
  return request('/api/screen/share', {
    method: 'GET',
    params,
  });
};

// 大屏分享权限信息获取
export const shareScreenGet = (params: API_SCREEN.TShareScreenGetParams) => {
  return request<API_SCREEN.TShareScreenGetData>('/api/screen/share/valid', {
    method: 'GET',
    params,
    mis: false,
  });
};

// 大屏分享权限验证
export const shareScreenPost = (data: API_SCREEN.TShareScreenPostParams) => {
  return request('/api/screen/share/valid', {
    method: 'POST',
    data: {
      ...data,
      env: REACT_APP_ENV || 'prod',
    },
  });
};

// 大屏启用
export const enableScreen = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/api/screen/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreen = (params: API_SCREEN.TDisabledScreenParams) => {
  return request('/api/screen/enable', {
    method: 'DELETE',
    params,
  });
};

// 服务端代理数据请求
export const preRequestData = (data: API_SCREEN.TPreRequestDataParams) => {
  return request(SERVICE_REQUEST_URL, {
    method: 'POST',
    data,
  });
};

// 大屏导入
export const postScreenLeadIn = (data: API_SCREEN.TPreLeadInDataParams) => {
  return request('/api/screen/pre/leadin', {
    method: 'POST',
    data,
  });
};

// 大屏导出
export const postScreenExport = (data: API_SCREEN.TPreExportDataParams) => {
  return request('/api/screen/pre/export', {
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    origin: true,
  });
};

// 新增快照
export async function addScreenShot(data: { _id: string }) {
  return request('/api/screen/shot', {
    method: 'POST',
    data,
  });
}

// 覆盖快照
// 将当前大屏的数据覆盖到当前快照，即更新快照的data
export async function coverScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/shot/cover', {
    method: 'POST',
    data,
  });
}

// 快照列表
export async function getScreenShotList(
  params: API_SCREEN.GetScreenShotListParams,
) {
  return request<{
    list: API_SCREEN.GetScreenShotListData[];
    total: number;
  }>('/api/screen/shot', {
    method: 'GET',
    params,
  });
}

// 使用快照
export async function useScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/shot/use', {
    method: 'POST',
    data,
  });
}

// 当前快照详情
export async function getCurrentScreenShotData(
  params: API_SCREEN.TGetScreenDetail,
) {
  return request<API_SCREEN.TScreenDetail>('/api/screen/shot/detail', {
    method: 'GET',
    params,
  });
}

// 当前快照的id
export async function getCurrentScreenShotId(
  params: API_SCREEN.TGetScreenDetail,
) {
  return request<{ data: string }>('/api/screen/shot/use', {
    method: 'GET',
    params,
  });
}

// 删除快照
export async function deleteScreenShot(params: {
  _id: string;
  screen: string;
}) {
  return request('/api/screen/shot', {
    method: 'DELETE',
    params,
  });
}

// 更新快照
export async function updateScreenShot(data: API_SCREEN.UpdateScreenShotData) {
  return request('/api/screen/shot', {
    method: 'PUT',
    data,
  });
}
