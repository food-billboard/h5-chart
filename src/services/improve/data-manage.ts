import { get } from 'lodash';
import PocketBase, {
  parseFilter,
  getUserId,
} from '../../utils/pocketBaseRequest';

// 获取数据源列表
export async function getDataSourceList(
  params: API_DATA_MANAGE.DataSourceParams,
): Promise<{
  list: API_DATA_MANAGE.DataSourceData[];
  total: number;
}> {
  const { current, pageSize, content } = params;
  return PocketBase.collection('data')
    .getList<API_IMPROVE.ResponseListData<API_DATA_MANAGE.DataSourceData>>(
      current,
      pageSize,
      {
        filter: parseFilter([
          {
            key: 'description',
            value: content,
            operator: '~',
          },
        ]),
      },
    )
    .then((data: any) => {
      return {
        list: get(data, 'data.res.list'),
        total: get(data, 'data.res.total'),
      };
    }) as any;
}

// 删除数据源列表
export async function deleteDataSource(params: { _id: string }) {
  return PocketBase.collection('data').delete(params._id);
}

// 新增数据源
export async function postDataSource(
  data: API_DATA_MANAGE.PostDataSourceParams,
) {
  return PocketBase.collection('data').create({
    user: getUserId(),
    ...data,
  });
}

// 编辑数据源
export async function updateDataSource(
  data: API_DATA_MANAGE.UpdateDataSourceParams,
) {
  const { _id, ...nextData } = data;
  return PocketBase.collection('data').update(_id, {
    ...nextData,
    user: getUserId(),
  });
}

// 数据源测试
export async function getTestDataSource(data: { _id: string; sql: string }) {
  return;
}

// // 获取数据集列表
// export async function getDataSetList(params: API_DATA_MANAGE.DataSetParams) {
//   return request('/api/screen/model', {
//     method: 'GET',
//     params,
//   });
// }

// // 获取数据集分组列表
// export async function getDataSetGroupList() {
//   return request('/api/screen/model', {
//     method: 'GET',
//   });
// }

// // 删除数据集分组
// export async function deleteDataSetGroup(params: { _id: string }) {
//   return request('/api/screen/model', {
//     method: 'DELETE',
//     params,
//   });
// }

// // 新增同级数据集分组
// export async function addBroDataSetGroup(data: { _id: string; label: string }) {
//   return request('/api/screen/model', {
//     method: 'POST',
//     data,
//   });
// }

// // 新增子级数据集分组
// export async function addChildDataSetGroup(data: {
//   _id: string;
//   label: string;
// }) {
//   return request('/api/screen/model', {
//     method: 'POST',
//     data,
//   });
// }

// // 修改数据集分组名称
// export async function updateDataSetGroup(data: { _id: string; label: string }) {
//   return request('/api/screen/model', {
//     method: 'PUT',
//     data,
//   });
// }
