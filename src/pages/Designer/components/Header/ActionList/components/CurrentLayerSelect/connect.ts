import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setSelect: (value: string[]) => dispatch({ type: 'global/setSelect', value }),
});
