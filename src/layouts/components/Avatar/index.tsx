import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntAvatar, Dropdown } from 'antd';
import { useCallback, useMemo } from 'react';
import { connect, history } from 'umi';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';

const Avatar = (props: { logout: () => void; userInfo: any }) => {
  const { logout, userInfo: { avatar, username } = {} } = props;

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleResetPassword = useCallback(() => {
    history.replace('/reset');
  }, []);

  const handleUserSet = useCallback(() => {
    history.replace('/reset');
  }, []);

  const menu = useMemo(() => {
    return [
      {
        label: <a onClick={handleLogout}>退出登录</a>,
        key: 'logout',
      },
    ];
  }, [handleLogout, handleResetPassword]);

  return (
    <Dropdown menu={{ items: menu }} placement="bottom">
      <AntAvatar src={avatar} icon={<UserOutlined />}>
        {username}
      </AntAvatar>
    </Dropdown>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
