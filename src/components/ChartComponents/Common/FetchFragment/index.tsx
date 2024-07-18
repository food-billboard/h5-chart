import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { noop } from 'lodash';
import { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { CompareFilterUtil } from '@/utils/Assist/FilterData';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type TFetchFragmentProps = {
  id: string;
  params: ComponentData.TParams[];
  filter: ComponentData.TFilterConfig[];
  constants: ComponentData.TConstants[];
  screenType: ComponentData.ScreenType;
  url: string;
  componentFilter: ComponentData.TComponentFilterConfig[];
  componentCondition?: ComponentData.ComponentConditionConfig;
  componentParams?: string[];

  reParams?: (targetParams: ComponentData.TParams, newValue: any) => void;
  reFetchData: () => Promise<any>;
  reGetValue: () => void;
  reCondition?: (
    condition: ComponentData.ComponentCondition,
    initialState: ComponentData.ComponentConditionConfig['initialState'],
  ) => void;
};

export type TFetchFragmentRef = {
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  filter: ComponentData.TFilterConfig[];
};

const FetchFragment = (props: TFetchFragmentProps) => {
  const {
    params,
    filter,
    constants,
    componentFilter,
    componentParams = [],
    componentCondition: componentConditionConfig = {
      value: [],
      initialState: 'visible',
    },
    url,
    reParams = noop,
    reFetchData,
    reGetValue,
    reCondition = noop,
    id,
  } = props;

  const { value: componentCondition = [], initialState } =
    componentConditionConfig;

  // 检查数据过滤的方法
  const filterUtil = useRef<CompareFilterUtil>(
    new CompareFilterUtil(
      {
        url,
        id,
        componentFilter,
        componentCondition,
        componentConstants: constants,
        componentParams,
        onParams: reParams,
        onFetch: async () => {
          return reFetchData();
        },
        onFilter: async () => {
          return reGetValue();
        },
        onCondition: (condition) => {
          return reCondition(condition, initialState);
        },
        onHashChange: () => {
          // * 可能存在hash值手动更改的情况
          filterUtil.current?.compare(params);
        },
      },
      filter,
      params,
    ),
  );

  // 数据发生改变的时候比较数据
  useUpdateEffect(() => {
    filterUtil.current?.compare(params);
  }, [params]);

  useDeepCompareEffect(() => {
    componentCondition.forEach((condition) => {
      reCondition(condition, initialState);
    });
  }, [componentCondition, reCondition, initialState]);

  useEffect(() => {
    reFetchData().then(reGetValue);
  }, []);

  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchFragment);
