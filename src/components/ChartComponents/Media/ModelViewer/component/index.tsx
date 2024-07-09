import '@google/model-viewer';
import { Progress, App } from 'antd';
import classnames from 'classnames';
import { uniqueId, merge, noop } from 'lodash';
import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TModelConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const ModelBasic = (
  props: ComponentData.CommonComponentProps<TModelConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const { screenType } = global;

  const { message } = App.useApp();

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const modelViewerRef = useRef<any>(null);

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { rotate, cameraControls, position, animation, scale, progress } =
    options;

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

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const onModelViewerLoad = (e: any) => {
      setTimeout(() => {
        setPageLoading(false);
      }, 2000);
      console.log(`3d模型${id}加载完成`);
    };

    const onModelViewerError = (error: any) => {
      setPageLoading(false);
      message.error('模型加载出错');
      console.error(`3d模型${id}加载出错: ${error}`);
    };

    const onModelViewerProgress = (event: any) => {
      const currentProgress = event.detail.totalProgress || 0;
      setLoadingProgress(currentProgress);
    };

    const onModelViewerClick = (event: any) => {
      // TODO
      // 需要一个具体的逻辑来暴露点击的位置信息
    };

    modelViewer.addEventListener('load', onModelViewerLoad);
    modelViewer.addEventListener('error', onModelViewerError);
    modelViewer.addEventListener('progress', onModelViewerProgress);
    if (screenType !== 'edit') {
      modelViewer.addEventListener('click', onModelViewerClick);
    }

    return () => {
      modelViewer.removeEventListener('load', onModelViewerLoad);
      modelViewer.removeEventListener('error', onModelViewerError);
      modelViewer.removeEventListener('progress', onModelViewerProgress);
      modelViewer.removeEventListener('click', onModelViewerClick);
    };
  }, [message, id, screenType]);

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
          <model-viewer
            ref={modelViewerRef}
            class="w-100 h-100"
            id={chartId.current}
            src={finalValue.value}
            poster={finalValue.poster}
            // 抗锯齿
            antialias
            // 相机控制
            camera-controls={cameraControls.show}
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
            scale={`${scale} ${scale} ${scale}`}
            // 禁止放大缩小
            // disable-zoom
            // 放大缩小的速度
            // zoom-sensitivity
          >
            {pageLoading && (
              <div
                className={classnames(styles['model-viewer-progress'])}
                slot="progress-bar"
              >
                <Progress
                  showInfo={false}
                  percent={loadingProgress * 100}
                  status="active"
                  strokeColor={{
                    from: getRgbaString(progress.from),
                    to: getRgbaString(progress.to),
                  }}
                />
              </div>
            )}
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
