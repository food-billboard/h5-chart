import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Pagination, Row, Col, Tabs, App, Empty } from 'antd';
import type { ModalProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import classnames from 'classnames';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from 'react';
import Modal from '@/components/FocusModal';
import { ContentLoading } from '@/components/PageLoading';
import {
  getMediaList,
  getMediaClassicList,
  deleteClassic,
  addClassic,
  updateClassic,
  deleteMediaData,
  addMediaData,
} from '@/services';
import ImageUpload from '../../../ImageUpload';
import BackgroundMap from '../Background';
import BackgroundRender from '../BackgroundRender';
import AddClassic, { AddClassicRef } from './components/AddClassic';
import styles from './index.less';

const LOCAL_BACKGROUND_LIST = Object.entries(BackgroundMap);
const LOCAL_BACKGROUND_LIST_TOTAL = LOCAL_BACKGROUND_LIST.length;

export type BackgroundData = {
  label: string;
  value: string;
  image: string | ReactNode;
  classic: string;
};

export type BackgroundSelectRef = {
  open: (visible?: boolean) => void;
};

export type BackgroundSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  mode: 'select' | 'editable';
  modalProps?: ModalProps;
  visibleType?: 'modal' | 'page';
  style?: CSSProperties;
  className?: string;
  internalIgnore?: boolean;
};

const BackgroundSelect = forwardRef<BackgroundSelectRef, BackgroundSelectProps>(
  (props, ref) => {
    const {
      mode,
      modalProps,
      visibleType = 'modal',
      style,
      className,
      internalIgnore = false,
    } = props;

    const { modal } = App.useApp();

    const [value, onChange] = useControllableValue(props);

    const [fetchLoading, setFetchLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentClassic, setCurrentClassic] = useState('');
    const [serviceDataSource, setServiceDataSource] = useState<
      BackgroundData[]
    >([]);
    const [classicDataSource, setClassicDataSource] = useState<
      API_SCREEN.MediaClassicData[]
    >([]);
    const [total, setTotal] = useState(0);

    const addClassicRef = useRef<AddClassicRef>(null);

    const pageSize = useRef(12);

    const handleSelectConfirm = useCallback(
      (value) => {
        if (mode !== 'select') return;
        onChange(value);
        setVisible(false);
      },
      [onChange, mode],
    );

    const classicItems = useMemo(() => {
      return [
        ...classicDataSource.map((item) => {
          return {
            label: (
              <>
                {item.name}
                {mode === 'editable' && (
                  <EditOutlined
                    className="m-l-4"
                    onClick={() => addClassicRef.current?.open(item)}
                  />
                )}
              </>
            ),
            key: item._id,
            closable: true,
            closeIcon: <DeleteOutlined />,
          };
        }),
        ...(internalIgnore
          ? []
          : [
              {
                label: '内置背景',
                key: 'internal',
                closable: false,
              },
            ]),
      ];
    }, [classicDataSource]);

    // 内置背景获取
    const normalDataSource = useMemo(() => {
      return LOCAL_BACKGROUND_LIST.slice(
        (currentPage - 1) * 10,
        currentPage * 10,
      ).map((item) => {
        const [key, { title, value }] = item;
        return {
          label: title,
          value: key,
          image: value,
        };
      });
    }, [currentPage]);

    const dataSource = useMemo(() => {
      return currentClassic !== 'internal'
        ? serviceDataSource
        : normalDataSource;
    }, [normalDataSource, serviceDataSource]);

    const tabBarExtraContent = useMemo(() => {
      if (mode === 'select') return null;
      return <></>;
    }, [mode]);

    // 获取分类数据
    const fetchClassifyData = async () => {
      const data = await getMediaClassicList({
        currPage: 0,
        pageSize: 999,
      });
      setClassicDataSource(data.list);
      return data.list;
    };

    // 获取数据
    const fetchData = useCallback(
      async ({ current, classic }: { current: number; classic: string }) => {
        if (!classic) {
          return;
        }
        if (classic === 'internal') {
          setTotal(LOCAL_BACKGROUND_LIST_TOTAL);
          setServiceDataSource([]);
          return;
        }
        setFetchLoading(true);
        const result = await getMediaList({
          current,
          pageSize: pageSize.current,
          _id: classic,
        });
        setServiceDataSource(
          result.list
            .filter((item: any) => item.src)
            .map((item: any) => {
              return {
                ...item,
                value: item.src,
                image: item.src,
                classic: item.classify,
                // 没有label
                label: '',
              };
            }),
        );
        setTotal(result.total);
        setFetchLoading(false);
      },
      [],
    );

    // 分类删除
    const handleDeleteClassic = useCallback(
      async (targetKey) => {
        await deleteClassic(targetKey);
        const length = classicDataSource.length;
        const index = classicDataSource.findIndex(
          (item) => item._id === targetKey,
        );
        let nextClassic = currentClassic;
        // 相同则切换至最近一个
        if (targetKey === currentClassic) {
          if (!index) {
            nextClassic = length === 1 ? 'internal' : classicDataSource[1]._id;
          } else {
            nextClassic = classicDataSource[index - 1]._id;
          }
          setCurrentPage(1);
        }
        classicDataSource.splice(index, 1);
        setClassicDataSource([...classicDataSource]);
        setCurrentClassic(nextClassic);
      },
      [classicDataSource, currentClassic],
    );

    // 新增或者修改分类
    const handleAddClassic = useCallback(async ({ name, _id }) => {
      try {
        let result: any;
        if (_id) {
          result = await updateClassic({ name, _id });
        } else {
          result = await addClassic({ name });
        }
        setCurrentPage(1);
        setCurrentClassic(result.data || _id);
        fetchClassifyData();
        return true;
      } catch (err) {
        return false;
      }
    }, []);

    // 分类切换
    const onTabChange = useCallback((currentClassic) => {
      setCurrentClassic(currentClassic);
      setCurrentPage(1);
    }, []);

    // 分类的新增和删除
    const onTabEdit = useCallback(
      (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
      ) => {
        if (action === 'add') {
          addClassicRef.current?.open();
        } else {
          modal.confirm({
            title: '提示',
            content: '删除分类同时会删除分类下的媒体资源，确认删除？',
            onOk: () => handleDeleteClassic(targetKey),
          });
        }
      },
      [handleDeleteClassic],
    );

    const onPageChange = useCallback((page) => {
      setCurrentPage(page);
    }, []);

    // 编辑模式下的图片删除
    const onDeleteBackground = useCallback(
      async ({ _id }) => {
        await deleteMediaData({ _id });
        if (currentPage === 1) {
          fetchData({ current: currentPage, classic: currentClassic });
        }
        setCurrentPage(1);
      },
      [currentPage, currentClassic],
    );

    // 图片上传完成
    const onBackgroundChange = useCallback(
      async (fileList: UploadFile<any>[]) => {
        const [target] = fileList;
        if (target?.status === 'done') {
          const imageId = target.response?.id || '';
          await addMediaData({ _id: currentClassic, image: imageId });
          if (currentPage === 1) {
            fetchData({ current: currentPage, classic: currentClassic });
          }
          setCurrentPage(1);
        }
      },
      [currentClassic, currentPage, currentClassic],
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          open: (visible = true) => {
            setVisible(visible);
          },
        };
      },
      [value],
    );

    useEffect(() => {
      fetchData({ current: currentPage, classic: currentClassic });
    }, [currentPage, currentClassic]);

    useEffect(() => {
      if (!visible) return;
      fetchClassifyData().then((list) => {
        if (list.length) {
          setCurrentClassic(list[0]._id);
        } else {
          setCurrentClassic('internal');
        }
      });
    }, [visible]);

    useEffect(() => {
      pageSize.current =
        mode === 'editable' && currentClassic !== 'internal' ? 11 : 12;
    }, [mode, currentClassic]);

    const children = (
      <div
        className={classnames(
          styles['internal-background-modal-list'],
          'pos-re',
          className,
        )}
        style={style}
      >
        <Tabs
          type={mode === 'editable' ? 'editable-card' : 'line'}
          onEdit={onTabEdit}
          items={classicItems}
          onChange={onTabChange}
          tabBarExtraContent={tabBarExtraContent}
          activeKey={currentClassic}
        />
        <Row gutter={24}>
          {mode === 'editable' && currentClassic !== 'internal' && (
            <Col span={6} style={{ height: 80, marginBottom: 12 }}>
              <ImageUpload
                value={[]}
                onChange={onBackgroundChange}
                inputVisible={false}
                height={'80px'}
              />
            </Col>
          )}
          {dataSource.map((item) => {
            const { label, value } = item;
            return (
              <Col
                span={6}
                key={value}
                className={styles['internal-background-modal-list-item']}
              >
                <BackgroundRender
                  onClick={handleSelectConfirm.bind(null, value)}
                  value={value}
                  className={styles['internal-background-modal-list-item-main']}
                  thumb
                  editable={
                    mode === 'editable' &&
                    currentClassic !== 'internal' && {
                      onDelete: onDeleteBackground.bind(null, item),
                    }
                  }
                />
                <div
                  className={
                    styles['internal-background-modal-list-item-label']
                  }
                >
                  {label}
                </div>
              </Col>
            );
          })}
        </Row>
        {!dataSource.length && mode !== 'editable' && (
          <div className="dis-flex-cen h-100">
            <Empty description={'暂无资源'} />
          </div>
        )}
        <Pagination
          total={total}
          pageSize={pageSize.current}
          current={currentPage}
          onChange={onPageChange}
          hideOnSinglePage
        />
        <ContentLoading loading={fetchLoading} />
      </div>
    );

    return (
      <>
        {visibleType === 'modal' ? (
          <Modal
            title="背景选择"
            open={visible}
            footer={null}
            onCancel={setVisible.bind(null, false)}
            zIndex={1071}
            {...modalProps}
          >
            {children}
          </Modal>
        ) : (
          <>{children}</>
        )}
        <AddClassic ref={addClassicRef} onConfirm={handleAddClassic} />
      </>
    );
  },
);

export default BackgroundSelect;
