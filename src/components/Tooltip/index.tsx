import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps } from 'antd/es/tooltip';
import Tooltip from '@/components/ChartComponents/Common/Tooltip';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';

// 携带input focus相关事件的tooltip
// 为了避免键盘事件在弹唱时响应
export const ScreenTooltip = (props: TooltipProps) => {
  return <Tooltip color={DEFAULT_THEME_COLOR} {...props} />;
};

const CusTooltip = (props: TooltipProps) => {
  return <AntTooltip color={DEFAULT_THEME_COLOR} {...props} />;
};

export default CusTooltip;
