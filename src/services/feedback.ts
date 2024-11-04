import request from '../utils/request';

// 提交反馈
export async function postFeedback(data: API_SCREEN.PostFeedbackParams) {
  return request('/api/screen/feedback', {
    method: 'POST',
    data,
  });
}
