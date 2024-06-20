import { App, Col, Row, Form, Switch } from 'antd';
import classnames from 'classnames';
import { set } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { connect } from 'umi';
import Modal from '@/components/FocusModal';
import { useAnyDva } from '@/hooks';
import { changeComponentsPositionAccordingModel } from '../../utils';
import { Thumb as Model1 } from './components/Model1';
import { Thumb as Model2 } from './components/Model2';
import { Thumb as Model3 } from './components/Model3';
import { Thumb as Model4 } from './components/Model4';
import { Thumb as Model5 } from './components/Model5';
import { Thumb as Model6 } from './components/Model6';
import { Thumb as Model7 } from './components/Model7';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const MODEL_LIST = [Model1, Model2, Model3, Model4, Model5, Model6, Model7];

const ModelList = (props: {
  onClose?: () => void;
  setScreenData: (value: SuperPartial<ComponentData.TScreenData>) => void;
}) => {
  const { onClose, setScreenData } = props;

  const { getState } = useAnyDva();

  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const { message } = App.useApp();

  const modelDataRef = useRef<ComponentData.ModelValueType>();

  const handleSelect = useCallback(
    (modelData) => {
      modelDataRef.current = modelData;
      onClose?.();
      setVisible(true);
    },
    [onClose],
  );

  const handleSelectOk = useCallback(() => {
    const { changeComponents = false } = form.getFieldsValue();
    const globalData = getState().global;

    // 将模板显示更改为显示
    const screenData = globalData.screenData;
    const newScreenData = {
      ...screenData,
    };
    set(newScreenData, 'config.attr.model', {
      show: true,
      value: modelDataRef.current,
    });
    setScreenData(newScreenData);

    // 将一级组及组件放置到距离其最近的区块左上角
    if (changeComponents) {
      changeComponentsPositionAccordingModel({
        model: modelDataRef.current,
      });
    }
    setVisible(false);
    message.info('操作成功，请等待~');
  }, [message]);

  return (
    <div className={classnames(styles['model-list'], 'p-lr-12')}>
      <Row gutter={12}>
        {MODEL_LIST.map((Model, index) => {
          return (
            <Col key={index} span={12} className="m-b-12">
              <Model onSelect={handleSelect} className="w-100" />
            </Col>
          );
        })}
      </Row>
      <Modal
        title="提示"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSelectOk}
        destroyOnClose
        width={520}
      >
        <div className={styles['modal-tooltip']}>
          <div className="f-b c-f-s-big m-b-8">
            应用模板后会新增该模板的宫格背景来方便排版，且只在设计阶段显示，也可以手动通过全局配置的“模板布局显示”控制显示隐藏~
          </div>
          <Form form={form}>
            <Form.Item
              name="changeComponents"
              label="组件变动"
              extra="更改现有组件位置至模板的对应区块范围内"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelList);
