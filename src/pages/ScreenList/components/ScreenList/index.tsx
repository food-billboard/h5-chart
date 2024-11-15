import {
  SendOutlined,
  DeleteOutlined,
  DesktopOutlined,
  CopyOutlined,
  ExportOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { Row, Col, Button, Switch, App, Dropdown } from 'antd';
import classnames from 'classnames';
import { useRef, useCallback } from 'react';
import { useAsyncCallback } from '@/hooks';
import {
  deleteScreen,
  previewScreen,
  shareScreen,
  enableScreen,
  disabledScreen,
  copyScreen,
  deleteScreenModel,
  previewScreenModel,
  enableScreenModel,
  disabledScreenModel,
  getCurrentScreenShotId,
} from '@/services';
import { exportData } from '@/utils/Assist/LeadInAndOutput';
import {
  goDesign,
  goPreview,
  goPreviewModel,
  goDesignModel,
} from '@/utils/tool';
import ShareSetting, { ShareSettingRef } from './ShareSetting';
import styles from './index.less';

const COL_SPAN = {
  xs: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 4,
};

const ScreenList = (props: {
  value: API_SCREEN.TGetScreenListData[];
  onChange?: () => any;
  // copy share delete export use
  ignoreAction?: string[];
  listType: 'screen' | 'model';
}) => {
  const { value, onChange, ignoreAction = [], listType = 'screen' } = props;

  const { message, modal } = App.useApp();

  const fetchLoading = useRef<boolean>(false);
  const shareSettingRef = useRef<ShareSettingRef>(null);

  // 启用 | 禁用
  const onEnabledChange = useCallback(
    async (target: API_SCREEN.TGetScreenListData, value, e) => {
      e.stopPropagation();
      if (fetchLoading.current) return;
      try {
        if (value) {
          await (listType === 'screen' ? enableScreen : enableScreenModel)({
            _id: target._id,
          });
        } else {
          await (listType === 'screen' ? disabledScreen : disabledScreenModel)({
            _id: target._id,
          });
        }
        onChange?.();
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange, listType],
  );

  // 编辑
  const handleEdit = useAsyncCallback(
    async (value) => {
      const { _id, enable } = value;
      if (enable) {
        if (listType === 'model') return;
        message.loading('数据获取中');
        const currentScreenShotId = await getCurrentScreenShotId({ _id });
        if (!currentScreenShotId.data) {
          const result = await new Promise((resolve) => {
            modal.confirm({
              title: '提示',
              content:
                '当前大屏暂无快照，修改大屏后分享链接的内容也会同步更改，是否确认修改',
              onOk: () => {
                resolve(true);
              },
              onCancel: () => {
                resolve(false);
              },
            });
          });
          if (!result) return;
        }
      }
      listType === 'screen' ? goDesign(_id) : goDesignModel(_id);
    },
    [listType, message, modal],
  );

  // 复制
  const copyScreenMethod = useCallback(
    async (value: any) => {
      fetchLoading.current = true;
      try {
        const response: any = await copyScreen({
          _id: value._id,
          type: 'screen',
        });
        await onChange?.();
        modal.confirm({
          title: '提示',
          content: '复制成功，是否跳转编辑？',
          onOk: () => {
            handleEdit({ _id: response[0] });
          },
        });
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange, handleEdit],
  );

  // 预览
  const previewScreenMethod = useCallback(
    async (value, e) => {
      e.stopPropagation();
      if (fetchLoading.current) return;
      fetchLoading.current = true;
      try {
        if (listType === 'screen') {
          await previewScreen({ _id: value._id });
          goPreview(value._id);
        } else {
          await previewScreenModel({ _id: value._id });
          goPreviewModel(value._id);
        }
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [listType],
  );

  // 分享
  const shareScreenMethod = useCallback(async (value) => {
    if (fetchLoading.current) return;
    fetchLoading.current = true;
    shareSettingRef.current?.open(value._id);
  }, []);

  // 确定分享参数
  const onShareOk = useCallback(
    async (value) => {
      try {
        await shareScreen(value);
        onChange?.();
        message.success('操作成功');
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange],
  );

  // 删除
  const deleteScreenMethod = useCallback(
    async (value) => {
      if (fetchLoading.current) return;
      modal.confirm({
        title: '提示',
        content: '是否确定删除？',
        onOk: async () => {
          try {
            await (listType === 'screen' ? deleteScreen : deleteScreenModel)({
              _id: value._id,
            });
            onChange?.();
          } catch (err) {
            message.info('操作失败');
          } finally {
            fetchLoading.current = false;
          }
        },
      });
    },
    [onChange, listType],
  );

  // 导出
  const handleExport = useCallback(
    async (value: API_SCREEN.TGetScreenListData) => {
      await exportData({
        type: listType,
        _id: value._id,
      });
    },
    [listType],
  );

  // 模板使用
  const useModelMethod = useCallback(
    async (value: any) => {
      fetchLoading.current = true;
      try {
        const response: any = await copyScreen({
          _id: value._id,
          type: 'model',
        });
        goDesign(response[0]);
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange, handleEdit],
  );

  // 更多操作
  const handleExtraActionClick = useCallback(
    (item, { key }) => {
      switch (key) {
        case 'copy':
          return copyScreenMethod(item);
        case 'share':
          return shareScreenMethod(item);
        case 'delete':
          return deleteScreenMethod(item);
        case 'export':
          return handleExport(item);
        case 'use':
          return useModelMethod(item);
      }
    },
    [
      copyScreenMethod,
      shareScreenMethod,
      deleteScreenMethod,
      handleExport,
      useModelMethod,
    ],
  );

  return (
    <div className={styles['screen-list-icon-content']}>
      <Row
        gutter={{
          xs: 12,
          sm: 24,
          md: 24,
        }}
      >
        {value.map((item) => {
          const { name, poster, _id, enable, description, flag } = item;

          const actionList: any = [];
          if (!ignoreAction.includes('copy')) {
            actionList.push({
              label: '复制',
              key: 'copy',
              icon: <CopyOutlined />,
            });
          }
          if (!ignoreAction.includes('share') && enable) {
            actionList.push({
              label: '分享',
              key: 'share',
              icon: <SendOutlined />,
            });
          }
          if (!ignoreAction.includes('export')) {
            actionList.push({
              label: '导出',
              key: 'export',
              icon: <ExportOutlined />,
            });
          }
          if (!ignoreAction.includes('delete') && !enable) {
            actionList.push({
              label: '删除',
              key: 'delete',
              icon: <DeleteOutlined />,
            });
          }
          if (!ignoreAction.includes('use')) {
            actionList.push({
              label: '使用',
              key: 'use',
              icon: <BranchesOutlined />,
            });
          }

          return (
            <Col key={_id} {...COL_SPAN} onClick={handleEdit.bind(null, item)}>
              <div className={styles['screen-list-icon-content-item']}>
                <div
                  className={styles['screen-list-icon-content-item-wrapper']}
                >
                  <div className={styles['screen-list-icon-content-item-main']}>
                    <img src={poster} />
                  </div>
                </div>
                <div className={styles['screen-list-icon-content-item-footer']}>
                  <div
                    className={classnames(
                      styles['screen-list-icon-content-item-footer-name'],
                      'dis-flex',
                    )}
                    title={name}
                  >
                    <div className="text-ellipsis m-r-4">{name}</div>
                    <div
                      style={{
                        color: flag === 'H5' ? 'orange' : 'green',
                      }}
                    >
                      ({flag})
                    </div>
                  </div>
                  <div
                    className={classnames(
                      styles['screen-list-icon-content-item-footer-desc'],
                      'text-ellipsis',
                    )}
                  >
                    {description || '无任何描述~'}
                  </div>
                  <div
                    className={
                      styles['screen-list-icon-content-item-footer-action']
                    }
                  >
                    <Switch
                      className={
                        enable
                          ? ''
                          : styles[
                              'screen-list-icon-content-item-footer-action-switch-close'
                            ]
                      }
                      checkedChildren="启用"
                      unCheckedChildren="禁用"
                      size="small"
                      checked={enable}
                      onChange={onEnabledChange.bind(null, item)}
                      style={{ marginRight: 7 }}
                    />
                    <Button
                      size="small"
                      icon={<DesktopOutlined />}
                      type="link"
                      onClick={previewScreenMethod.bind(null, item)}
                    >
                      预览
                    </Button>
                    <Dropdown
                      menu={{
                        items: actionList,
                        onClick: handleExtraActionClick.bind(null, item),
                      }}
                    >
                      <Button size="small" type="link" title="更多操作">
                        更多
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <ShareSetting
        onOk={onShareOk}
        onCancel={() => (fetchLoading.current = false)}
        onCancelShare={() => (fetchLoading.current = false)}
        ref={shareSettingRef}
      />
    </div>
  );
};

export default ScreenList;
