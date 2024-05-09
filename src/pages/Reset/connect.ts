import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  forget: (value: any) => dispatch({ type: 'user/forget', payload: value }),
});
