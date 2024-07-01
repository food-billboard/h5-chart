import '@google/model-viewer';
import { useUpdateEffect } from 'ahooks';
import classnames from 'classnames';
import { uniqueId, merge, noop } from 'lodash';
import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { usePrimaryColor } from '@/hooks';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { DEFAULT_THREE_D_MODEL_URL } from '@/utils/constants';
import { CHART_ID } from '../id';
import { TModelConfig } from '../type';
import styles from './index.less';

const getDomain = (url: string) => {
  try {
    return new URL(url).origin;
  } catch (err) {
    return '';
  }
};

const BASE_DOMAIN = getDomain(DEFAULT_THREE_D_MODEL_URL);

const ModelBasic = (
  props: ComponentData.CommonComponentProps<TModelConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const color = usePrimaryColor();

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { rotate, cameraControls, position, animation, scale } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TModelConfig>({
    component: value,
    global,
  });

  const onModelViewerLoad = useCallback((e) => {
    setPageLoading(false);
    console.log('load');
  }, []);

  const onModelViewerError = useCallback(() => {
    setPageLoading(false);
    console.log('error');
  }, []);

  const onModelViewerProgress = useCallback(() => {
    console.log('progress');
  }, []);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-media-model']);
  }, [className]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          {/* {pageLoading && (
            <div className={styles['component-media-model-loading']}>
              <GridLoader loading color={color} />
            </div>
          )} */}
          <model-viewer
            id={chartId.current}
            src={finalValue.value}
            poster={finalValue.poster}
            // 抗锯齿
            antialias
            // 相机控制
            camera-controls={cameraControls}
            // 自动旋转
            auto-rotate={rotate.show}
            // 延迟旋转
            auto-rotate-delay={rotate.delay}
            // 相机位置
            camera-target={`${position.x} ${position.y} ${position.z}`}
            // 动画名称
            animation-name={animation.name}
            // 动画变动过渡时间
            animation-crossfade-duration={300}
            // 动画自动播放
            autoplay
            loading="auto"
            onLoad={onModelViewerLoad}
            onError={onModelViewerError}
            onProgress={onModelViewerProgress}
            scale={`${scale} ${scale} ${scale}`}

            // 禁止放大缩小
            // disable-zoom
            // 放大缩小的速度
            // zoom-sensitivity
          >
            <div slot="progress-bar">2222222</div>
          </model-viewer>
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={noop}
        componentFilter={componentFilter}
        componentCondition={{
          value: [],
          initialState: 'visible',
        }}
      />
    </>
  );
};

const WrapperModelBasic: typeof ModelBasic & {
  id: ComponentData.TComponentSelfType;
} = ModelBasic as any;

WrapperModelBasic.id = CHART_ID;

export default WrapperModelBasic;
