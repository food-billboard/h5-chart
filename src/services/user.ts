import { merge } from 'lodash';
import { request } from '@/utils';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import {
  getUserInfo4Improve,
  accountLogin4Improve,
  getCaptcha4Improve,
  outLogin4Improve,
  forgetPassword4Improve,
  register4Improve,
} from './improve';

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
export async function getUserInfo() {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getUserInfo4Improve();
  return request<any>('/api/customer/manage', {
    method: 'GET',
  });
}

// 登录
export async function accountLogin(
  params: Pick<LoginParamsType, 'mobile' | 'password' | 'email'>,
) {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return accountLogin4Improve(params);
  return request<any>('/api/user/logon/account', {
    method: 'POST',
    data: merge(params, { env: REACT_APP_ENV || 'prod' }),
    mis: false,
  });
}

// 邮箱验证码
export async function getCaptcha(email: string, type: 'register' | 'forget') {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return getCaptcha4Improve(email, type);
  return request(`/api/user/logon/email`, {
    method: 'POST',
    data: {
      email,
      type,
    },
  });
}

// 退出登录
export async function outLogin() {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return outLogin4Improve();
  return request('/api/user/logon/signout', {
    method: 'POST',
  });
}

// 忘记密码
export async function forgetPassword(params: ResetParamsType) {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return forgetPassword4Improve(params);
  return request('/api/user/logon/forget', {
    method: 'PUT',
    data: params,
  });
}

// 注册
export async function register(params: RegisterParamsType) {
  if (GlobalConfig.IS_IMPROVE_BACKEND) return register4Improve(params);
  return request('/api/user/logon/register', {
    method: 'POST',
    data: params,
  });
}
