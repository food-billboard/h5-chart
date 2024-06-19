import { Space } from 'antd';
import { UndoIcon, RedoIcon } from './components/ActionUndoAndRedo';
import CallbackManage from './components/CallbackManage';
import CollapseConfigPanel from './components/CollapseConfigPanel';
import ComponentListCollapse from './components/ComponentListCollapse';
import ConstantManage from './components/ConstantManage';
import DebugConfig from './components/DebugConfig';
import LayerSearch from './components/LayerSearch';
import LayerShowIcon from './components/LayerShowControl';
import LensManage from './components/LensConfig';
import LocalConfigManage from './components/LocalConfigMange';
import ModelManage from './components/ModelManage';
import RequestDefaultConfig from './components/RequestDefaultConfig';
import ThemeConfig from './components/ThemeConfig';
import styles from './index.less';

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <UndoIcon />
      <RedoIcon />
      <DebugConfig />
      <LayerSearch />
      <ComponentListCollapse />
      <CollapseConfigPanel />
      <LayerShowIcon />
      <CallbackManage />
      <ConstantManage />
      <LocalConfigManage />
      <RequestDefaultConfig />
      <LensManage />
      <ThemeConfig />
      <ModelManage />
    </Space>
  );
};

export default ActionList;
