import ApiConfig, { ApiConfigProps } from './ApiConfig';
import DataBaseConfig, { DataBaseConfigProps } from './DataBaseConfig';
import MockConfig, { MockConfigProps } from './MockConfig';
import StaticConfig from './StaticConfig';
import { TOnChange } from './type';

const DefineConfig = (props: {
  type?: ComponentData.TComponentApiDataConfig['request']['type'];
  staticProps?: {
    value?: string;
    onChange?: TOnChange;
  };
  databaseProps?: Omit<DataBaseConfigProps, 'params' | 'constants'>;
  apiProps?: Omit<ApiConfigProps, 'params' | 'constants'>;
  mockProps?: Omit<MockConfigProps, 'params' | 'constants'>;
}) => {
  const { type, staticProps, apiProps, mockProps } = props;

  if (type === 'database') return <DataBaseConfig {...mockProps!} />;

  if (type === 'mock') return <MockConfig {...mockProps!} />;

  if (type === 'api') return <ApiConfig {...apiProps!} />;

  return <StaticConfig {...staticProps!} />;
};

export default DefineConfig;
