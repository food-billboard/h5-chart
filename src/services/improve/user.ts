import { createImproveUploadResultFileUrl } from '@/utils/Assist/Upload';
import PocketBase, { getUserInfo } from '../../utils/pocketBaseRequest';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
  email: string;
}

export interface RegisterParamsType
  extends Pick<LoginParamsType, 'mobile' | 'password' | 'captcha'> {
  email: string;
}

export interface ResetParamsType
  extends Pick<RegisterParamsType, 'email' | 'password' | 'captcha'> {}

// 获取当前用户信息
export async function getUserInfo4Improve() {
  return PocketBase.collection('users')
    .authRefresh()
    .then((data) => {
      const { record, token } = data;
      return {
        token,
        ...record,
        _id: record.id,
        avatar: createImproveUploadResultFileUrl({
          ...record,
          file: record.avatar,
        } as any),
      };
    });
}

// 登录
export async function accountLogin4Improve(
  params: Pick<LoginParamsType, 'email' | 'password'>,
) {
  return PocketBase.collection('users').authWithPassword(
    params.email,
    params.password,
  );
}

// 邮箱验证码
export async function getCaptcha4Improve(
  email: string,
  type: 'register' | 'forget',
) {
  return PocketBase.collection('users').requestVerification(email);
}

// 退出登录
export async function outLogin4Improve() {
  return PocketBase.authStore.clear();
}

// 忘记密码
export async function forgetPassword4Improve(params: ResetParamsType) {
  return PocketBase.collection('users').confirmPasswordReset(
    getUserInfo().token,
    params.password,
    params.password,
  );
}

// 注册
export async function register4Improve(params: RegisterParamsType) {
  const { email, password } = params;
  return PocketBase.collection('users').create({
    username: `a-salted-fish-${Date.now()}`,
    email,
    password,
    passwordConfirm: password,
  });
}
