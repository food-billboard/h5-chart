import { Input, App } from 'antd';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Modal from '@/components/FocusModal';

export type AddClassicRef = {
  open: (params?: API_SCREEN.UpdateMediaClassParams) => void;
};

export type AddClassicProps = {
  onConfirm: (
    data: Partial<API_SCREEN.UpdateMediaClassParams>,
  ) => Promise<boolean>;
};

const AddClassic = forwardRef<AddClassicRef, AddClassicProps>((props, ref) => {
  const { onConfirm } = props;

  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');

  const [loading, setLoading] = useState(false);

  const { message } = App.useApp();

  const baseValue = useRef<Partial<API_SCREEN.UpdateMediaClassParams>>({});

  const close = () => setVisible(false);

  const open = (value?: API_SCREEN.UpdateMediaClassParams) => {
    baseValue.current = value || {};
    setVisible(true);
    setLabel(value?.name || '');
  };

  const onOk = useCallback(async () => {
    if (!label) return message.info('请输入分类名称');
    setLoading(true);
    const result = await onConfirm({ ...baseValue.current, name: label });
    setLoading(false);
    if (result) {
      setVisible(false);
    }
  }, [label, onConfirm]);

  const onChange = useCallback((e) => {
    setLabel(e.target.value);
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
      title="新增分类"
      open={visible}
      onCancel={close}
      onOk={onOk}
      width={200}
      confirmLoading={loading}
    >
      <Input
        className="w-100"
        placeholder="请输入分类名称"
        onChange={onChange}
        value={label}
      />
    </Modal>
  );
});

export default AddClassic;
