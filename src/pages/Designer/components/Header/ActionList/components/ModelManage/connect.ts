import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    flag: state.global.screenData.config.flag.type,
    modelShow: state.global.screenData.config.attr.model.show,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
