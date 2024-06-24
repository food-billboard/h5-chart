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
