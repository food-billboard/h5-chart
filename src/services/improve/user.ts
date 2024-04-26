import { merge } from 'lodash';
import PocketBase from '../../utils/pocketBaseRequest';
import request from '../../utils/request';

const { REACT_APP_ENV } = process.env;

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
  return request<any>('/api/customer/manage', {
    method: 'GET',
  });
}

// 登录
export async function accountLogin4Improve(
  params: Pick<LoginParamsType, 'email' | 'password'>,
) {
  return PocketBase.collection('user').authWithPassword(
    params.email,
    params.password,
  );
}

// 邮箱验证码
export async function getCaptcha4Improve(
  email: string,
  type: 'register' | 'forget',
) {
  return PocketBase.collection('user').requestVerification(email);
}

// 退出登录
export async function outLogin4Improve() {
  return PocketBase.authStore.clear();
}

// 忘记密码
export async function forgetPassword4Improve(params: ResetParamsType) {
  return request('/api/user/logon/forget', {
    method: 'PUT',
    data: params,
  });
}

// 注册
export async function register4Improve(params: RegisterParamsType) {
  return PocketBase.collection('user').create({});
  return request('/api/user/logon/register', {
    method: 'POST',
    data: params,
  });
}
