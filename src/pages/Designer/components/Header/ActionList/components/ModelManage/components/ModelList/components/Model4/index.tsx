import { useCallback } from 'react';
import ModelThumbRender, { parseGridData } from '../ModelThumbRender';
import { CommonModelProps } from '../type';

const GRID_DATA = parseGridData([
  [[1, 1], [2, 2], [], [1, 1]],
  [[1, 1], [], [], [1, 1]],
  [[1, 1], [2, 1], [], [1, 1]],
]);

export const Thumb = (props: CommonModelProps) => {
  const { onSelect, ...nextProps } = props;

  const handleSelect = useCallback(() => {
    onSelect?.(GRID_DATA);
  }, []);

  return (
    <ModelThumbRender
      {...nextProps}
      onClick={handleSelect}
      label="八宫格"
      value={GRID_DATA}
    />
  );
};
