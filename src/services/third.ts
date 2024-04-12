import GlobalConfig from '@/utils/Assist/GlobalConfig';
import request from '../utils/request';
import { getWeatherData4Improve } from './improve';

// 获取天气
export const getWeatherData = (data: API_THIRD.TWeatherParams) => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getWeatherData4Improve(data);
  return request<API_THIRD.TWeatherData>('/api/third/request', {
    method: 'POST',
    data: {
      params: {
        ...data,
        _id: '630c7f824fa77520a214a75d',
      },
    },
  });
};
