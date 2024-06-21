import classnames from 'classnames';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import ModelThumbRender from '../../../Header/ActionList/components/ModelManage/components/ModelList/components/ModelThumbRender';
import styles from './index.less';

const ModelPlaceholder = (props: {
  modelShow: boolean;
  modelValue: string;
  scale: number;
  screenType: ComponentData.ScreenType;
}) => {
  const { modelShow, modelValue, screenType, scale = 100 } = props;

  if (!modelShow || screenType !== 'edit' || !modelValue.length) return null;

  return (
    <div
      className={classnames('w-100 h-100 pos-ab', styles['model-placeholder'])}
    >
      <ModelThumbRender
        value={modelValue}
        className={styles['model-placeholder-main']}
        scale={scale / 100}
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
      scale: state.global.scale,
    };
  },
  (dispatch: any) => {
    return {};
  },
)(ModelPlaceholder);
