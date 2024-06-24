import { get } from 'lodash';
import PocketBase from '../../utils/pocketBaseRequest';
import request from '../../utils/request';

// 文件上传
export async function uploadFileImprove(
  file: File,
): Promise<API_IMPROVE.MediaData> {
  const formData = new FormData();
  formData.append('file', file);
  return PocketBase.collection('media').create(formData);
}

// 获取媒体资源列表
export async function getMediaList(
  params: API_IMPROVE.MediaParams,
): Promise<API_IMPROVE.MediaDataRes> {
  const { current, pageSize } = params;
  return PocketBase.collection('media')
    .getList<API_IMPROVE.ResponseListData<API_IMPROVE.MediaData>>(
      current,
      pageSize,
    )
    .then((data: any) => {
      return {
        list: get(data, 'data.res.list'),
        total: get(data, 'data.res.total'),
      };
    }) as any;
}

// ! 暂时没用
// 获取媒体资源分类列表
export async function getMediaClassicList() {
  return request('/api/screen/model', {
    method: 'GET',
    improve: true,
  });
}

// ! 暂时没用
// 删除媒体资源分类
export async function deleteClassic(classic: string) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params: {
      classic,
    },
    improve: true,
  });
}

// ! 暂时没用
// 新增媒体资源分类
export async function addClassic(data: API_IMPROVE.AddMediaClassicParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// ! 暂时没用
// 修改媒体资源分类
export async function updateClassic(data: API_IMPROVE.UpdateMediaClassParams) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// ! 暂时没用
// 新增媒体资源
export async function addMediaData(data: API_IMPROVE.AddMediaDataParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// ! 暂时没用
// 删除媒体资源
export async function deleteMediaData(
  params: API_IMPROVE.DeleteMediaDataParams,
) {
  const { collectionId, id } = params;
  return request(`/api/collections/${collectionId}/records/${id}`, {
    method: 'DELETE',
    improve: true,
  });
}
