import PocketBase, { getUserId } from '../../utils/pocketBaseRequest';

// 提交反馈
export async function postFeedback(data: API_IMPROVE.PostFeedbackParams) {
  return PocketBase.collection('screen_feedback').create({
    user: getUserId(),
    ...data,
  });
}
