import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    modelValue: state.global.screenData.config.attr.model.value,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreenData: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
