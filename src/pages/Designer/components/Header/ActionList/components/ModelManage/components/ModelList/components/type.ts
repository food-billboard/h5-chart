import { CSSProperties } from 'react';

export type CommonModelProps = {
  onSelect?: (modelData: ComponentData.ModelValueType) => void;
  style?: CSSProperties;
  className?: string;
};
