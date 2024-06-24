import { useSize } from 'ahooks';
import classnames from 'classnames';
import { CSSProperties, Fragment, useMemo, useRef } from 'react';
import { useColorThemeList } from '@/hooks';
import { MODEL_BASE_DATA } from '../../constant';
import { WIDTH, HEIGHT, HEADER_HEIGHT, PADDING } from '../../utils';
import styles from './index.less';

const ModelThumbRender = (props: {
  onClick?: (key: string) => void;
  style?: CSSProperties;
  className?: string;
  label?: string;
  value: string;
  active?: boolean;
  scale?: number;
}) => {
  const {
    onClick,
    style,
    className,
    label,
    value,
    active = false,
    scale: propsScale = 1,
  } = props;

  const [primaryColor, ...nextColorList] = useColorThemeList();
  const [lastColor] = nextColorList.slice(-1);

  const elementRef = useRef<HTMLDivElement>(null);

  const { width = 0 } =
    useSize(() => {
      return elementRef.current;
    }) || {};

  const scale = useMemo(() => {
    return width / WIDTH || 1;
  }, [width]);

  const fontScale = useMemo(() => {
    return scale * propsScale;
  }, [scale, propsScale]);

  const activeColor = useMemo(() => {
    return active ? lastColor : primaryColor;
  }, [active, primaryColor, lastColor]);

  const gridValue = useMemo(() => {
    return MODEL_BASE_DATA.find((item) => item.key === value)?.gridValue || [];
  }, [value]);

  const children = useMemo(() => {
    return (
      <div className="w-100 h-100 pos-ab">
        <div
          className="dis-flex-cen"
          style={{
            width: ((WIDTH - PADDING * 2) / WIDTH) * 100 + '%',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            height: (HEADER_HEIGHT / HEIGHT) * 100 + '%',
            border: `${Math.max(1, 1 / fontScale)}px solid ${activeColor}`,
          }}
        >
          标题栏
        </div>
        {gridValue.map((row, rowIndex) => {
          if (!row) return null;
          return (
            <Fragment key={rowIndex}>
              {row.map((column, columnIndex) => {
                if (!column) return null;
                const { width, height, left, top } = column;
                return (
                  <div
                    key={columnIndex}
                    style={{
                      position: 'absolute',
                      left: (left / WIDTH) * 100 + '%',
                      top: (top / HEIGHT) * 100 + '%',
                      width: (width / WIDTH) * 100 + '%',
                      height: (height / HEIGHT) * 100 + '%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `${Math.max(
                        1,
                        1 / fontScale,
                      )}px solid ${activeColor}`,
                      fontWeight: active ? 'bold' : 'normal',
                    }}
                  >
                    宫格
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    );
  }, [gridValue, active, activeColor, scale]);

  return (
    <div
      ref={elementRef}
      onClick={onClick?.bind(null, value)}
      style={style}
      className={classnames(styles['model-thumb-render'], className, 'w-100')}
    >
      <div
        className={classnames(
          styles['model-thumb-render-main'],
          'w-100 m-b-8 over-hide',
        )}
      >
        <div
          className={styles['model-thumb-render-main-content']}
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'left top',
            fontSize: `${Math.min(12 / fontScale, 75)}px`,
          }}
        >
          {children}
        </div>
      </div>
      <div className="c-f-s ali-cen">{label}</div>
    </div>
  );
};

export default ModelThumbRender;
