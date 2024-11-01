// import * as packageInfo from '../../../package.json';

export * from './another';
export * from './color';
export * from './data';
export * from './defaultValue';
export * from './mobile';
export { default as DEFAULT_SCREEN_DATA } from './screenData';
export * from './theme';

// 按钮标识强制更新的标识
export const API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG =
  'IMMEDIATELY_REQUEST_FLAG';

// 懒更新api请求的标识
export const API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG = '(LAZY_REQUEST_FLAG)';

export enum EComponentType {
  GROUP_COMPONENT = 'GROUP_COMPONENT',
  COMPONENT = 'COMPONENT',
}

export enum EComponentSelfType {
  GROUP_COMPONENT = 'GROUP_COMPONENT',
  BAR_BASIC = 'BAR_BASIC',
  BAR_LINE = 'BAR_LINE',
  LINE_BASIC = 'LINE_BASIC',
  LINE_WATERFALL = 'LINE_WATERFALL',
}

export const PANEL_ABSOLUTE_POSITION = {
  left: 30,
  top: 30,
};

export const ECHARTS_URL = 'https://echarts.apache.org/zh/index.html';

let VERSION: string;

export const SCREEN_VERSION = () => {
  if (VERSION) return VERSION;
  VERSION = require('../../../package.json').version;
  return VERSION;
};
export const SCREEN_MODEL_VERSION = () => {
  if (VERSION) return VERSION;
  VERSION = require('../../../package.json').version;
  return VERSION;
};

// mock 数据请求的后端地址
export const MOCK_REQUEST_URL = '/api/screen/mock';

// 服务端请求的后端地址
export const SERVICE_REQUEST_URL = '/api/screen/pre/request';

// 数据请求超时时间
export const REQUEST_TIMEOUT = 10000;

// 默认的大屏封面
export const DEFAULT_SCREEN_COVER =
  process.env.REACT_APP === 'static'
    ? 'data:image/png;base64,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'
    : `http://${process.env.RASPBERRY_IP}/static/image/f1362ed8ce07a37b4e57734901cf7efb.png`;

// 3d model 展示的url地址
export const DEFAULT_THREE_D_MODEL_URL = `http://${process.env.RASPBERRY_IP}/api/backend/three-model/index.html`;
