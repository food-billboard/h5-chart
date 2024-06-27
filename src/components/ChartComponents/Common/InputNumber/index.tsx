import { useDebounceFn, useUnmount } from 'ahooks';
import { InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps as AntInputNumberProps } from 'antd/es/input-number';
import classnames from 'classnames';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Validator, useValidatorChange } from '@/hooks';
import FormModal from '../FormModal';

export type InputNumberProps = AntInputNumberProps & {
  triggerOnChangeInOnChange?: boolean;
  validator?: Validator[];
};

const InputNumber = (props: InputNumberProps) => {
  const {
    triggerOnChangeInOnChange = false,
    validator = [],
    ...nextProps
  } = props;
  const {
    value,
    defaultValue,
    onChange: propsOnChange,
    onBlur: propsOnBlur,
    className,
    onFocus: propsOnFocus,
    onStep: propsOnStep,
  } = nextProps;

  const [stateValue, setStateValue] = useState<number | string>(
    value ?? defaultValue ?? 0,
  );
  const focus = useRef<boolean>(!!props.autoFocus);

  const onChange = useCallback(
    (value) => {
      setStateValue(value);
      triggerOnChangeInOnChange && propsOnChange?.(value);
    },
    [propsOnChange, triggerOnChangeInOnChange],
  );

  const { validator: validatorValue } = useValidatorChange(onChange);

  const onBlur = useCallback(
    (e) => {
      const realValue = validatorValue(value, '', validator);
      if (realValue !== stateValue) propsOnChange?.(stateValue);
      propsOnBlur?.(e);
      focus.current = false;
    },
    [propsOnBlur, propsOnChange, stateValue, value, validator],
  );

  const onFocus = useCallback(
    (e) => {
      propsOnFocus?.(e);
      focus.current = true;
    },
    [propsOnFocus],
  );

  const { run: debounceChange } = useDebounceFn(
    (value) => {
      propsOnChange?.(value);
    },
    {
      wait: 250,
    },
  );

  const onStep = useCallback(
    (value, info) => {
      debounceChange(value);
      propsOnStep?.(value, info);
    },
    [propsOnStep, debounceChange],
  );

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value as any);
    }
  }, [value]);

  useUnmount(() => {
    if (value !== stateValue && focus.current) propsOnChange?.(stateValue);
  });

  return (
    <AntInputNumber
      {...nextProps}
      className={classnames('w-100', className)}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
      onFocus={onFocus}
      onStep={onStep}
    />
  );
};

export const InputNumberModal = FormModal<InputNumberProps>(InputNumber);

export default InputNumber;
