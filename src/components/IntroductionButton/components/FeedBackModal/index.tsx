import { Form, Input, Select } from 'antd';
import {
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useRef,
} from 'react';
import { CommonImageListUpload } from '@/components/ImageUpload';
import { postFeedback } from '@/services';
import Modal from '../../../FocusModal';

export type FeedBackRef = {
  open: () => void;
};

export type FeedBackProps = {};

const FeedBackModal = forwardRef<FeedBackRef, FeedBackProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm<{
    description: string;
    image: any[];
    type: 'BUG' | 'RECOMMEND' | 'QUESTION';
  }>();

  const loadingRef = useRef(false);

  const open = () => {
    setVisible(true);
    form.resetFields();
  };

  const close = () => setVisible(false);

  const handleOk = useCallback(() => {
    if (loadingRef.current) return;
    form
      .validateFields()
      .then(async (values) => {
        loadingRef.current = true;
        const { image, ...nextValues } = values;
        await postFeedback({
          ...nextValues,
          image: image.map((item) => item.originFileObj),
        });
        console.log(values);
      })
      .then(close)
      .catch((err) => {})
      .then(() => {
        loadingRef.current = false;
      });
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Modal
      destroyOnClose
      open={visible}
      title="问题反馈"
      onCancel={close}
      onOk={handleOk}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item
          name="type"
          label="问题类型"
          rules={[{ required: true }]}
          initialValue={'BUG'}
        >
          <Select
            placeholder="请选择问题类型"
            options={[
              {
                label: 'BUG',
                value: 'BUG',
              },
              {
                label: '疑问',
                value: 'QUESTION',
              },
              {
                label: '建议',
                value: 'RECOMMEND',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="问题描述"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="请描述您的问题！" />
        </Form.Item>
        <Form.Item name="image" label="问题截图" initialValue={[]}>
          <CommonImageListUpload limit={6} needUpload={false} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default FeedBackModal;
