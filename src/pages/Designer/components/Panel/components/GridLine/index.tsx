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
    return 5;
    // return Math.min(8, Math.max(5, (100 / scale) * 5));
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
    const baseSize = gridLine.followGrid ? grid : gridLine.size;
    const scale = state.global.scale;
    let minGridSize = 10;
    if (scale <= 50) {
      minGridSize = 100;
    } else if (scale <= 100) {
      minGridSize = 50;
    } else {
      minGridSize = 10;
    }
    return {
      gridLineShow: gridLine.show,
      gridLineSize: Math.max(baseSize, minGridSize),
      screenType: state.global.screenType,
      scale: state.global.scale,
    };
  },
  (dispatch: any) => {
    return {};
  },
)(GridLine);
