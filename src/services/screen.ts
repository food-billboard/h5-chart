import { merge } from 'lodash';
import { isModelHash, useAnyDva } from '@/hooks';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { getLocationQuery } from '../utils';
import { SCREEN_VERSION, SERVICE_REQUEST_URL } from '../utils/constants';
import request from '../utils/request';
import {
  postScreen4Improve,
  putScreen4Improve,
  putScreenPool4Improve,
  createPutScreenPool4Improve,
  putScreenPoolValid4Improve,
  deleteScreenPool4Improve,
  getScreenDetail4Improve,
  getScreenList4Improve,
  deleteScreen4Improve,
  previewScreen4Improve,
  previewScreenValid4Improve,
  copyScreen4Improve,
  shareScreen4Improve,
  closeShareScreen4Improve,
  shareScreenHeartbeat4Improve,
  shareScreenGet4Improve,
  shareScreenPost4Improve,
  enableScreen4Improve,
  disabledScreen4Improve,
  preRequestData4Improve,
  postScreenLeadIn4Improve,
  postScreenExport4Improve,
} from './improve';

const { REACT_APP_ENV } = process.env;

export {
  getScreenShotList,
  getCurrentScreenShotData,
  deleteScreenShot,
  updateScreenShot,
  addScreenShot,
  useScreenShot,
  coverScreenShot,
} from './improve';

// 新增大屏
export const postScreen = (data: API_SCREEN.TAddScreenParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return postScreen4Improve(data);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return putScreen4Improve(data);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return putScreenPool4Improve(data);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return createPutScreenPool4Improve(data);
  return request('/api/screen/list/pool', {
    method: 'POST',
    data,
  });
};

// 大屏编辑状态验证
export const putScreenPoolValid = (params: { _id: string }) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND)
    return putScreenPoolValid4Improve(params);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND)
    return deleteScreenPool4Improve(sync, customParams);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getScreenDetail4Improve(params);
  return request<API_SCREEN.TScreenDetail>('/api/screen/detail', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenList = (params: API_SCREEN.TGetScreenListParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getScreenList4Improve(params);
  return request<any>('/api/screen/list', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏删除
export const deleteScreen = (params: API_SCREEN.TDeleteScreenParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return deleteScreen4Improve(params);
  return request('/api/screen/list', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreen = (data: API_SCREEN.TPreviewScreenParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return previewScreen4Improve(data);
  return request('/api/screen/preview', {
    method: 'POST',
    data,
  });
};

// 大屏预览验证
export const previewScreenValid = (params: API_SCREEN.TPreviewScreenParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND)
    return previewScreenValid4Improve(params);
  return request('/api/screen/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏复制 | 大屏模板使用
export const copyScreen = (data: { _id: string; type: 'screen' | 'model' }) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return copyScreen4Improve(data);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return shareScreen4Improve(data);
  return request('/api/screen/share', {
    method: 'POST',
    data,
  });
};

// 大屏分享关闭
export const closeShareScreen = (
  params: API_SCREEN.TCloseShareScreenParams,
) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return closeShareScreen4Improve(params);
  return request('/api/screen/share', {
    method: 'DELETE',
    params,
  });
};

// 大屏分享心跳检测
export const shareScreenHeartbeat = (
  params: API_SCREEN.TShareScreenHeartbeatParams,
) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND)
    return shareScreenHeartbeat4Improve(params);
  return request('/api/screen/share', {
    method: 'GET',
    params,
  });
};

// 大屏分享权限信息获取
export const shareScreenGet = (params: API_SCREEN.TShareScreenGetParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return shareScreenGet4Improve(params);
  return request<API_SCREEN.TShareScreenGetData>('/api/screen/share/valid', {
    method: 'GET',
    params,
    mis: false,
  });
};

// 大屏分享权限验证
export const shareScreenPost = (data: API_SCREEN.TShareScreenPostParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return shareScreenPost4Improve(data);
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
  if (GlobalConfig.IS_IMPROVE_BACKEND) return enableScreen4Improve(data);
  return request('/api/screen/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreen = (params: API_SCREEN.TDisabledScreenParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return disabledScreen4Improve(params);
  return request('/api/screen/enable', {
    method: 'DELETE',
    params,
  });
};

// 服务端代理数据请求
export const preRequestData = (data: API_SCREEN.TPreRequestDataParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return preRequestData4Improve(data);
  return request(SERVICE_REQUEST_URL, {
    method: 'POST',
    data,
  });
};

// 大屏导入
export const postScreenLeadIn = (data: API_SCREEN.TPreLeadInDataParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return postScreenLeadIn4Improve(data);
  return request('/api/screen/pre/leadin', {
    method: 'POST',
    data,
  });
};

// 大屏导出
export const postScreenExport = (data: API_SCREEN.TPreExportDataParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return postScreenExport4Improve(data);
  return request('/api/screen/pre/export', {
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    origin: true,
  });
};
