import GlobalConfig from '@/utils/Assist/GlobalConfig';
import request from '../utils/request';
import { getMockKindList4Improve } from './improve';

// mock数据格式列表
export const getMockKindList = async () => {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getMockKindList4Improve();
  return request<API_MOCK.TGetMockKindListData[]>('/api/screen/mock/params', {
    method: 'GET',
  }).then((data) => {
    return data.map((item: any) => {
      return {
        id: item._id,
        value: item.data_kind,
        description: item.description,
      };
    });
  });
};
