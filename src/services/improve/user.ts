import PocketBase from '../../utils/pocketBaseRequest';

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
  return PocketBase.collection('user')
    .authRefresh()
    .then((data) => {
      console.log(data, 222222);
      return data;
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
  return PocketBase.collection('user').requestPasswordReset(params.email);
}

// 注册
export async function register4Improve(params: RegisterParamsType) {
  const { email, password } = params;
  return PocketBase.collection('user').create({
    username: `一条咸鱼${Date.now()}`,
    email,
    password,
    passwordConfirm: password,
    avatar: `${process.env.API_IMPROVE_URL}/api/files/2032389060504322048/2047184411262189568/OxXgNBVZeA_NWHbVLN0eo.jpg`,
  });
}
