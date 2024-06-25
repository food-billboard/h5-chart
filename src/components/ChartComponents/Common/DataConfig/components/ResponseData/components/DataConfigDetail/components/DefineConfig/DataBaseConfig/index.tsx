import { InfoCircleOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { merge } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'umi';
import IconTooltipBase from '@/components/IconTooltip';
import { getDataSourceList } from '@/services';
import FilterDataUtil from '@/utils/Assist/FilterData';
import SubTitle, { SubForm } from '../../SubTitle';
import { RequestUrlTooltip } from '../ApiConfig';
import CodeEditor from '../SaveCodeEditor';
import { TOnChange } from '../type';
import { mapDispatchToProps, mapStateToProps } from './connect';

export const IconTooltip = () => {
  return (
    <IconTooltipBase title="可以使用全局的变量">
      <InfoCircleOutlined className="m-r-4" />
    </IconTooltipBase>
  );
};

export type DataBaseConfigProps = {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  componentId: string;
};

const DataBaseConfig = (props: DataBaseConfigProps) => {
  const { onChange, value, params, constants, componentId } = props;
  const {
    request: { url, databaseSource },
  } = value;

  const [databaseSourceList, setDatabaseSourceList] = useState<
    { label: string; value: string }[]
  >([]);

  const onValueChange = useCallback(
    async (key, keyValue) => {
      const result: any = await FilterDataUtil.requestData(
        componentId,
        merge({}, value, {
          request: {
            [key]: keyValue,
          },
        }),
        params,
        constants,
      );

      onChange?.({
        request: {
          [key]: keyValue,
          value: result,
        },
      });
    },
    [params, constants, value, databaseSource, url],
  );

  useEffect(() => {
    getDataSourceList({
      current: 1,
      pageSize: 999,
    }).then((data) => {
      setDatabaseSourceList(
        data.list.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        }),
      );
    });
  }, []);

  return (
    <div>
      <SubTitle>数据源</SubTitle>
      <SubForm>
        <Select
          options={databaseSourceList}
          value={databaseSource}
          onChange={onValueChange.bind(null, 'databaseSource')}
        />
      </SubForm>
      <SubTitle>
        <IconTooltipBase title={<RequestUrlTooltip />}>
          <InfoCircleOutlined className="m-r-4" />
        </IconTooltipBase>
        SQL
      </SubTitle>
      <SubForm>
        <CodeEditor
          language="txt"
          value={url}
          onChange={onValueChange.bind(null, 'url')}
        />
      </SubForm>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataBaseConfig);
