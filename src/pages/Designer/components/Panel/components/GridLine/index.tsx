import classnames from 'classnames';
import { useMemo } from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import styles from './index.less';

const GridLine = (props: {
  gridLineShow: boolean;
  gridLineSize: number;
  screenType: ComponentData.ScreenType;
  scale: number;
}) => {
  const { gridLineShow, gridLineSize, screenType, scale } = props;

  const gridLineColor = '#ccc';

  const borderSize = useMemo(() => {
    return Math.min(20, Math.max(1, (100 / scale) * 5));
  }, [scale]);

  if (!gridLineShow || screenType !== 'edit') return <></>;

  return (
    <div
      className={classnames('w-100 h-100 pos-ab', styles['grid-line'])}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gridLineColor} ${borderSize}%, transparent 0), linear-gradient(${gridLineColor} ${borderSize}%, transparent 0)`,
        backgroundSize: `${gridLineSize}px ${gridLineSize}px`,
      }}
    />
  );
};

export default connect(
  (state: ConnectState) => {
    const config = state.global.screenData.config.attr;
    const gridLine = config.gridLine;
    const grid = config.grid;
    return {
      gridLineShow: gridLine.show,
      gridLineSize: Math.max(gridLine.followGrid ? grid : gridLine.size, 10),
      screenType: state.global.screenType,
      scale: state.global.scale,
    };
  },
  (dispatch: any) => {
    return {};
  },
)(GridLine);
