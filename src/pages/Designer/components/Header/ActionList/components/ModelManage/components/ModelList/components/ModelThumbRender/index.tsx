import classnames from 'classnames';
import { CSSProperties, Fragment, useMemo } from 'react';
import { usePrimaryColor } from '@/hooks';
import styles from './index.less';

// 总宽度
export const WIDTH = 1920;
// 总高度
export const HEIGHT = 1080;
// 标题行的高度
export const HEADER_HEIGHT = 150;
// 各个模块之间的间距
export const PADDING = 20;
// 列数
export const COLUMNS = 4;
// 行数
export const ROW = 3;

// 将grid信息转变为实际的位置尺寸信息
export function parseGridData(
  value: number[][][],
): ComponentData.ModelValueType {
  const totalColumn = value.filter((item) => item.length).length;
  const totalColumnPadding = (totalColumn + 1) * PADDING;
  const unitHeight = (HEIGHT - totalColumnPadding - HEADER_HEIGHT) / ROW;

  return new Array(ROW)
    .fill(0)
    .map((_, rowIndex) => {
      const targetColumn = value[rowIndex];

      if (!targetColumn.length) return null;
      const prevColumnCount = value
        .slice(0, rowIndex)
        .filter((item) => item.length).length;
      const prevColumnPadding = PADDING * (prevColumnCount + 1);

      const currentRowTotalColumn = targetColumn.filter(
        (item) => item.length,
      ).length;
      const currentRowTotalPadding = (currentRowTotalColumn + 1) * PADDING;
      const unitWidth = (WIDTH - currentRowTotalPadding) / COLUMNS;
      return new Array(COLUMNS)
        .fill(0)
        .map((_, columnIndex) => {
          const [colSpan, rowSpan] = targetColumn[columnIndex];
          if (!colSpan) return null;
          const prevRowCount = targetColumn
            .slice(0, columnIndex)
            .filter((item) => item.length).length;
          const prevRowPadding = PADDING * (prevRowCount + 1);
          return {
            left: prevRowPadding + unitWidth * columnIndex,
            top: prevColumnPadding + unitHeight * rowIndex + HEADER_HEIGHT,
            width: unitWidth * colSpan,
            height: unitHeight * rowSpan + (rowSpan - 1) * PADDING,
          };
        })
        .filter(Boolean);
    })
    .filter(Boolean) as ComponentData.ModelValueType;
}

const ModelThumbRender = (props: {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  label: string;
  value: ComponentData.ModelValueType;
}) => {
  const { onClick, style, className, label, value } = props;

  const primaryColor = usePrimaryColor();

  const children = useMemo(() => {
    return (
      <div className="w-100 h-100 pos-ab">
        <div
          className="ali-cen"
          style={{
            width: ((WIDTH - PADDING * 2) / WIDTH) * 100 + '%',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            height: (HEADER_HEIGHT / HEIGHT) * 100 + '%',
            border: `1px solid ${primaryColor}`,
          }}
        >
          标题栏
        </div>
        {value.map((row, rowIndex) => {
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
                      border: `1px solid ${primaryColor}`,
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
  }, [value]);

  return (
    <div
      onClick={onClick}
      style={style}
      className={classnames(styles['model-thumb-render'], className, 'w-100')}
    >
      <div
        className={classnames(styles['model-thumb-render-main'], 'w-100 m-b-8')}
      >
        <div className={styles['model-thumb-render-main-content']}>
          {children}
        </div>
      </div>
      <div className="c-f-s ali-cen">{label}</div>
    </div>
  );
};

export default ModelThumbRender;
