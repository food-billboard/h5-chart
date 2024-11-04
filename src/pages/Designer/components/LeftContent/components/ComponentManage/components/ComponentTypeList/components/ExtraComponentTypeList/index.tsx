import { InfoCircleOutlined, BuildOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { EventEmitter } from 'eventemitter3';
import { set } from 'lodash';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { connect } from 'umi';
import BackgroundSelect, {
  BackgroundSelectRef,
} from '@/components/InternalBackground/components/BackgroundSelect';
import { ConnectState } from '@/models/connect';
import { createComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import {
  commonClass,
  COMPONENT_TYPE_LIST,
} from '../../../../../../../../utils/component';

const emitter = new EventEmitter();

let TARGET_MEDIA_COMPONENT_CONTAINER!: ComponentType.ComponentChildren;

function find(list: any[]): any {
  for (let i = 0; i < list.length; i++) {
    const { children, type } = list[i];
    if (children) {
      find(children);
    } else if (type === DEFAULT_COMPONENT_TYPE) {
      TARGET_MEDIA_COMPONENT_CONTAINER = list[i];
    }
  }
}

const DEFAULT_COMPONENT_TYPE = 'IMAGE';
find(COMPONENT_TYPE_LIST);

// 媒体资源组件列表
const _MediaResourceComponentList = (props: {
  setSelect: (value: string[]) => void;
}) => {
  const { setSelect } = props;

  const modalRef = useRef<BackgroundSelectRef>(null);

  const handleSelect = useCallback((value) => {
    const { title, description, type } = TARGET_MEDIA_COMPONENT_CONTAINER;
    const component = createComponent({
      name: title,
      description,
      componentType: type,
      config: {
        style: {
          left: 0,
          top: 0,
        },
      },
    });

    // ? 将默认图片数据设置到图片组件中
    set(component, 'config.options.type', 'image');
    set(component, 'config.data.request.value', {
      value,
    });
    set(component, 'config.options.content', value);

    DataChangePool.setComponent({
      action: 'add',
      id: component.id,
      value: component,
      path: '',
    });

    setSelect([component.id]);
  }, []);

  useEffect(() => {
    function listener(visible: boolean) {
      modalRef.current?.open(visible);
    }
    emitter.addListener('mediaShow', listener);
    return () => {
      emitter.removeListener('mediaShow', listener);
    };
  }, []);

  return (
    <BackgroundSelect
      visibleType="modal"
      mode="select"
      modalProps={{
        title: '媒体资源选择',
      }}
      ref={modalRef}
      onChange={handleSelect}
    />
  );
};

export const MediaResourceComponentList = connect(
  (state: ConnectState) => {
    return {};
  },
  (dispatch) => {
    return {
      setSelect: (value: string[]) =>
        dispatch({ type: 'global/setSelect', value }),
    };
  },
)(_MediaResourceComponentList);

// 额外
export const EXTRA_TYPE_EMPTY_DESC_MAP = {
  mediaResource: (
    <Button
      onClick={() => emitter.emit('mediaShow', true)}
      type="link"
      icon={<InfoCircleOutlined />}
    >
      点击选择媒体资源
    </Button>
  ),
};

export const useExtraComponentTypeList = () => {
  const extraTypeList = useMemo(() => {
    if (GlobalConfig.IS_STATIC) return [];
    return [
      {
        onClick: () => {
          emitter.emit('mediaShow', true);
        },
        type: 'mediaResource',
        icon: <BuildOutlined className={commonClass} />,
        title: '资源',
      },
    ];
  }, []);

  return [extraTypeList];
};

export const ExtraComponentChildren = () => {
  return (
    <>
      <MediaResourceComponentList />
    </>
  );
};
