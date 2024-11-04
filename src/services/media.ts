import request from '../utils/request';

// 获取媒体资源列表
export async function getMediaList(
  params: API_SCREEN.MediaParams,
): Promise<API_SCREEN.MediaDataRes> {
  return request<API_SCREEN.MediaDataRes>('/api/screen/media', {
    method: 'GET',
    params,
  });
}

// 获取媒体资源分类列表
export async function getMediaClassicList(params: {
  currPage?: number;
  pageSize?: number;
  content?: string;
}) {
  return request<{
    total: number;
    list: API_SCREEN.MediaClassicData[];
  }>('/api/screen/media-classify', {
    method: 'GET',
    params,
  });
}

// 删除媒体资源分类
export async function deleteClassic(_id: string) {
  return request('/api/screen/media-classify', {
    method: 'DELETE',
    params: {
      _id,
    },
  });
}

// 新增媒体资源分类
export async function addClassic(data: API_SCREEN.AddMediaClassicParams) {
  return request('/api/screen/media-classify', {
    method: 'POST',
    data,
  });
}

// 修改媒体资源分类
export async function updateClassic(data: API_SCREEN.UpdateMediaClassParams) {
  return request('/api/screen/media-classify', {
    method: 'PUT',
    data,
  });
}

// 新增媒体资源
export async function addMediaData(data: API_SCREEN.AddMediaDataParams) {
  return request('/api/screen/media', {
    method: 'POST',
    data,
  });
}

// 删除媒体资源
export async function deleteMediaData(
  params: API_SCREEN.DeleteMediaDataParams,
) {
  return request(`/api/screen/media`, {
    method: 'DELETE',
    params,
  });
}
