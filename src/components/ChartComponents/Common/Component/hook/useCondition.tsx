import classnames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import LazyLoadWrapper from '@/components/LazyLoad';
import type { WinBoxRef } from '@/components/Winbox';

const WinBox = LazyLoadWrapper<any, WinBoxRef>(() => {
  return import(/* webpackChunkName: "WinBox" */ '@/components/Winbox');
});

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const useCondition = ({
  onCondition,
  screenType,
}: {
  onCondition: (
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false;
  screenType: ComponentData.ComponentProps['global']['screenType'];
}) => {
  const [className, setClassName] = useState<string>('');
  const [style, setStyle] = useState<CSSProperties>({});
  const [modalVisible, setModalVisible] = useState(false);

  const boxRef = useRef<WinBoxRef>(null);

  // 响应条件变化
  const internalOnCondition = useCallback(
    (
      condition: ComponentData.ComponentCondition,
      initialState: ComponentData.ComponentConditionConfig['initialState'],
    ) => {
      if (screenType === 'edit') return false;

      const result = onCondition(condition);

      console.log(result, 222222);

      switch (result) {
        case 'ease-in':
          setClassName('animate__fadeIn animate__animated');
          setStyle({});
          break;
        case 'ease-in-out':
          setClassName('component-condition-ease-in-out');
          setStyle({});
          break;
        case 'ease-out':
          setClassName('animate__fadeOut animate__animated');
          setStyle({});
          break;
        case 'hidden':
          setClassName('component-condition-hidden');
          setStyle({});
          break;
        case 'visible':
        // 小窗显示
        case 'modal-visible':
          setClassName('');
          setStyle({});
          setModalVisible(result === 'modal-visible');
          break;
        default:
          setClassName(
            initialState === 'visible' ? '' : 'component-condition-hidden',
          );
          setStyle({});
      }

      return result;
    },
    [onCondition, screenType],
  );

  const conditionComponent = useMemo(() => {
    return forwardRef<HTMLDivElement, DivProps>(function (props, ref) {
      const {
        className: customClassName,
        style: customStyle,
        ...nextProps
      } = props;
      return (
        <div
          {...nextProps}
          ref={ref}
          className={classnames(customClassName, className)}
          style={{
            ...customStyle,
            ...style,
          }}
        />
      );
    });
  }, [style, className]);

  return {
    onCondition: internalOnCondition,
    ConditionComponent: conditionComponent,
  };
};
