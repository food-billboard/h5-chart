import classnames from 'classnames';
import { EventEmitter } from 'eventemitter3';
import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import LazyLoadWrapper from '@/components/LazyLoad';
import type { WinBoxRef } from '@/components/Winbox';

const EMITTER = new EventEmitter();

const WinBox = LazyLoadWrapper<any, WinBoxRef>(() => {
  return import(/* webpackChunkName: "WinBox" */ '@/components/Winbox');
});

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  componentId: string;
};

export const ConditionComponent = forwardRef<HTMLDivElement, DivProps>(
  function (props, ref) {
    const {
      className: customClassName,
      style: customStyle,
      componentId,
      ...nextProps
    } = props;

    const [visible, setVisible] = useState(false);

    const [className, setClassName] = useState<string>('');
    const [style, setStyle] = useState<CSSProperties>({});

    const boxRef = useRef<WinBoxRef>(null);

    const childrenProps = {
      ...nextProps,
      ref,
      className: classnames(customClassName, className),
      style: {
        ...customStyle,
        ...style,
      },
    };

    useEffect(() => {
      function listener(config: {
        className: string;
        style: CSSProperties;
        modalVisible: boolean;
      }) {
        const { className, style, modalVisible = false } = config;
        boxRef.current?.open(modalVisible);
        setVisible(modalVisible);
        setClassName(className);
        setStyle(style);
      }
      EMITTER.addListener(componentId, listener);
      return () => {
        EMITTER.removeListener(componentId, listener);
      };
    }, [componentId]);

    return (
      <>
        <div
          {...childrenProps}
          style={{
            pointerEvents: visible ? 'none' : 'all',
            ...childrenProps.style,
          }}
        />
        <WinBox
          wrapperComponentRef={boxRef}
          widthRate={[0.4, 0.7]}
          heightRate={[0.4, 0.7]}
          onClose={() => setVisible(false)}
        >
          <div {...childrenProps} />
        </WinBox>
      </>
    );
  },
);

export const useCondition = ({
  onCondition,
  screenType,
  componentId,
}: {
  onCondition: (
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false;
  screenType: ComponentData.ComponentProps['global']['screenType'];
  componentId: string;
}) => {
  // 响应条件变化
  const internalOnCondition = useCallback(
    (
      condition: ComponentData.ComponentCondition,
      initialState: ComponentData.ComponentConditionConfig['initialState'],
    ) => {
      if (screenType === 'edit') return false;

      const result = onCondition(condition);
      let className = '';
      let style: CSSProperties = {};
      let modalVisible = false;

      switch (result) {
        case 'ease-in':
          className = 'animate__fadeIn animate__animated';
          break;
        case 'ease-in-out':
          className = 'component-condition-ease-in-out';
          break;
        case 'ease-out':
          className = 'animate__fadeOut animate__animated';
          break;
        case 'hidden':
          className = 'component-condition-hidden';
          break;
        case 'visible':
        // 小窗显示
        case 'modal-visible':
          modalVisible = result === 'modal-visible';
          break;
        default:
          className =
            initialState === 'visible' ? '' : 'component-condition-hidden';
      }

      EMITTER.emit(componentId, {
        className,
        style,
        modalVisible,
      });

      return result;
    },
    [onCondition, screenType, componentId],
  );

  return {
    onCondition: internalOnCondition,
  };
};
