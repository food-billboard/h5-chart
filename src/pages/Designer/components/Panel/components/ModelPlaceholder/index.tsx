import classnames from 'classnames';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import ModelThumbRender from '../../../Header/ActionList/components/ModelManage/components/ModelList/components/ModelThumbRender';
import styles from './index.less';

const ModelPlaceholder = (props: {
  modelShow: boolean;
  modelValue: ComponentData.ModelValueType;
  screenType: ComponentData.ScreenType;
}) => {
  const { modelShow, modelValue, screenType } = props;

  if (!modelShow || screenType !== 'edit' || !modelValue.length) return null;

  return (
    <div
      className={classnames('w-100 h-100 pos-ab', styles['model-placeholder'])}
    >
      <ModelThumbRender
        value={modelValue}
        className={styles['model-placeholder-main']}
      />
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    const model = state.global.screenData.config.attr.model;
    return {
      modelShow: model.show,
      modelValue: model.value,
      screenType: state.global.screenType,
    };
  },
  (dispatch: any) => {
    return {};
  },
)(ModelPlaceholder);
