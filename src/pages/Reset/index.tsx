import { Button, App } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import { Email, Password } from '../Login';
import CommonBackground from '../Login/components/Background';
import { mapDispatchToProps, mapStateToProps } from './connect';

const Reset = (props: { forget: (value: any) => any }) => {
  const { forget } = props;

  const { message } = App.useApp();

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const handleReset = useCallback(async () => {
    if (fetchLoading) return;
    const realEmail = email.trim();
    if (!password) {
      return message.info('请输入密码');
    }
    if (!realEmail) {
      return message.info('请输入邮箱');
    }

    setFetchLoading(true);
    try {
      await forget({ password, email: realEmail });
    } catch (err) {
      message.info('提交错误');
    } finally {
      setFetchLoading(false);
    }
  }, [password, forget, email]);

  const action = useMemo(() => {
    return (
      <Button
        style={{ marginTop: 4 }}
        loading={fetchLoading}
        type="primary"
        block
        onClick={handleReset}
      >
        提交
      </Button>
    );
  }, [handleReset]);

  return (
    <CommonBackground title="重置密码" action={action} onSubmit={handleReset}>
      <Email value={email} onChange={setEmail} />
      <Password value={password} onChange={setPassword} />
    </CommonBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
