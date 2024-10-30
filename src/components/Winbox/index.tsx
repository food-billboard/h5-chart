import {
  CloseCircleOutlined,
  FullscreenOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import {
  useControllableValue,
  useSize,
  useFullscreen,
  useToggle,
  useUpdateEffect,
  useGetState,
} from 'ahooks';
import { Button, Space } from 'antd';
import classnames from 'classnames';
import {
  forwardRef,
  useImperativeHandle,
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';
import { DEFAULT_THEME_COLOR_LIST } from '@/utils/Assist/Theme';
import styles from './index.less';

export type WinBoxRef = {
  open: (visible?: boolean) => void;
};

const Winbox = forwardRef<
  WinBoxRef,
  {
    widthRate?: [number, number];
    heightRate?: [number, number];
    onClose?: () => void;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    defaultX?: number;
    defaultY?: number;
    defaultWidth?: number;
    defaultHeight?: number;
    title?: ReactNode;
    actionIgnore?: string[];
    scale: number;
  }
>((props, ref) => {
  const {
    widthRate = [0.3, 0.6],
    heightRate = [0.3, 0.6],
    onClose,
    children,
    defaultWidth = 300,
    defaultHeight = 200,
    defaultX: propsDefaultX,
    defaultY: propsDefaultY,
    title,
    style,
    actionIgnore,
    visible: _visible,
    ...nextProps
  } = props;

  const { width = 0, height = 0 } = useSize(() => document.body) || {};

  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
    defaultValue: false,
  });
  const [rndWidth, setRndWidth] = useState<number>(defaultWidth);
  const [rndHeight, setRndHeight] = useState<number>(defaultHeight);
  const [rndX, setRndX, getRndX] = useGetState<number | undefined>(
    propsDefaultX,
  );
  const [rndY, setRndY, getRndY] = useGetState<number | undefined>(
    propsDefaultY,
  );
  const [expandScreen, { set: setExpandScreen, toggle: toggleExpandScreen }] =
    useToggle(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const expandBeforeInfo = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(modalRef);

  const [colorA, , colorB] = DEFAULT_THEME_COLOR_LIST;

  const { defaultX, defaultY } = useMemo(() => {
    return {
      defaultX: propsDefaultX ?? width - defaultWidth - 60,
      defaultY: propsDefaultY ?? height - defaultHeight - 60,
    };
  }, [
    propsDefaultX,
    propsDefaultY,
    width,
    height,
    defaultWidth,
    defaultHeight,
  ]);

  const handleExpand = useCallback(() => {
    if (expandScreen) {
      const { width, height, x, y } = expandBeforeInfo.current;
      setRndWidth(width);
      setRndHeight(height);
      setRndX(x);
      setRndY(y);
    } else {
      expandBeforeInfo.current = {
        width: rndWidth,
        height: rndHeight,
        x: rndX!,
        y: rndY!,
      };
      setRndWidth(width);
      setRndHeight(height);
      setRndX(0);
      setRndY(0);
    }
    toggleExpandScreen();
  }, [expandScreen, rndWidth, rndHeight, rndX, rndY, width, height]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onDragStop: RndDragCallback = (event, data) => {
    const { x, y } = data;
    setRndX(x), setRndY(y);
  };

  const onResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    const { width, height } = delta;
    const { x, y } = position;
    setRndX(x), setRndY(y);
    setRndWidth(width);
    setRndHeight(height);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (visible) => {
          setVisible((prev) => {
            return visible ?? !prev;
          });
        },
      };
    },
    [],
  );

  useUpdateEffect(() => {
    if (!visible) {
      setExpandScreen(false);
      exitFullscreen();
    }
  }, [visible]);

  useEffect(() => {
    if (getRndX() === undefined) {
      setRndX(defaultX);
    }
    if (getRndY() === undefined) {
      setRndY(defaultY);
    }
  }, [defaultX, defaultY]);

  if (!visible) return null;

  return createPortal(
    <Rnd
      {...nextProps}
      style={{
        ...style,
        zIndex: 1001,
      }}
      enableResizing={!expandScreen}
      disableDragging={expandScreen}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      default={{
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight,
      }}
      size={{
        width: rndWidth,
        height: rndHeight,
      }}
      position={{
        x: rndX || defaultX,
        y: rndY || defaultY,
      }}
      // minWidth={Math.max(width * widthRate[0], 350)}
      // minHeight={height * heightRate[0]}
      // maxWidth={width * widthRate[1]}
      // maxHeight={height * heightRate[1]}
    >
      <div
        className={styles['winbox-wrapper']}
        style={{
          background: `linear-gradient(90deg, ${colorA}, ${colorB})`,
        }}
      >
        <div
          className={classnames(styles['winbox-wrapper-header'], 'dis-flex')}
        >
          <div
            className={classnames(
              styles['winbox-wrapper-header-title'],
              'c-f-s-big f-b',
            )}
          >
            {title}
          </div>
          <Space className="winbox-wrapper-header-action">
            {!actionIgnore?.includes('expand') && (
              <Button
                icon={<ExpandOutlined />}
                onClick={handleExpand}
                type="text"
              ></Button>
            )}
            {!actionIgnore?.includes('full') && (
              <Button
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                type="text"
              ></Button>
            )}
            <Button
              icon={<CloseCircleOutlined />}
              onClick={handleClose}
              type="text"
            ></Button>
          </Space>
        </div>
        <div ref={modalRef} className={styles['winbox-wrapper-content']}>
          {children}
        </div>
      </div>
    </Rnd>,
    document.body,
  );
});

export default Winbox;
