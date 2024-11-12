import { Pagination, Input, Button, Empty, Space, Select } from 'antd';
import classnames from 'classnames';
import { useState, useCallback, useEffect, useRef } from 'react';
import GhostButton from '@/components/GhostButton';
import { getScreenList, getScreenModelList } from '@/services';
import { LeadIn } from '@/utils/Assist/LeadInAndOutput';
import AddDesigner from './components/AddDesigner';
import List from './components/ScreenList';
import SvgAnimation from './components/SvgAnimation';
import styles from './index.less';

const { Search } = Input;

export type ScreenListProps = {
  listType: 'screen' | 'model';
};

function ScreenList(props: ScreenListProps) {
  const { listType = 'screen' } = props;

  const [currPage, setCurrPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>('');
  const [searchType, setSearchType] = useState<
    ComponentData.ScreenFlagType | ''
  >('');
  const [list, setList] = useState<API_SCREEN.TGetScreenListData[]>([]);

  const fetchLoading = useRef<boolean>(false);

  const onPageChange = useCallback((page) => {
    setCurrPage(page);
  }, []);

  const fetchData = async (
    params: Partial<{
      currPage: number;
      content: string;
      flag: typeof searchType;
    }> = {},
  ) => {
    if (fetchLoading.current) return;
    fetchLoading.current = true;

    const {
      currPage: paramsCurrentPage,
      content: paramsContent,
      flag: paramsFlag,
    } = params;

    try {
      const res = await (listType === 'screen'
        ? getScreenList
        : getScreenModelList)({
        currPage: ((paramsCurrentPage ?? currPage) || 1) - 1,
        content: paramsContent ?? searchData,
        flag: paramsFlag ?? searchType,
        pageSize: 10,
      });
      const { total, list } = res.data.res;
      setTotal(total);
      setList(list);
    } catch (err) {
    } finally {
      fetchLoading.current = false;
    }
  };

  const handleReset = useCallback(() => {
    setSearchData('');
    setSearchType('');
    fetchData({
      currPage: 0,
      content: '',
      flag: '',
    });
  }, []);

  const onChange = useCallback(async () => {
    await fetchData({
      currPage,
    });
  }, [currPage]);

  const handleLeadIn = useCallback(async () => {
    LeadIn(listType, fetchData.bind(null, {}));
  }, [listType]);

  const onVisibilityChange = useCallback(
    (e: any) => {
      const isHidden = e.target.webkitHidden;
      if (!isHidden) {
        fetchData({});
      }
    },
    [searchData, searchType, currPage],
  );

  useEffect(() => {
    fetchData({
      currPage,
    });
  }, [currPage]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return (
    <>
      <SvgAnimation />
      <div
        className={classnames(
          styles['screen-page-content-main-header'],
          'animate__fadeInDown',
          'animate__animated',
          'animate__delay-1s',
        )}
      >
        自己做的数据可视化大屏{listType === 'model' && '模板'}
      </div>
      <div
        className={classnames(
          styles['screen-page-content-main-action'],
          'm-t-16',
          'dis-flex',
        )}
      >
        <Space>
          <Search
            className="m-b-16"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            onSearch={fetchData.bind(null, {
              currPage,
              content: searchData,
            })}
            placeholder={`输入大屏${
              listType === 'model' ? '模板' : ''
            }名称或描述以搜索`}
          />
          <Select
            className="m-b-16"
            value={searchType}
            onChange={setSearchType}
            style={{ width: 200 }}
            options={[
              {
                label: '全部',
                value: '',
              },
              {
                label: 'PC端',
                value: 'PC',
              },
              {
                label: '移动端',
                value: 'H5',
              },
            ]}
          />
          <Button
            className="m-b-16"
            type="primary"
            onClick={fetchData.bind(null, {})}
          >
            搜索
          </Button>
          <GhostButton
            className="m-r-8 m-b-16"
            style={{ width: 'auto' }}
            onClick={handleReset}
          >
            重置
          </GhostButton>
        </Space>
        <div className="m-b-16">
          <Space>
            <Button type="primary" onClick={handleLeadIn}>
              导入
            </Button>
            <AddDesigner type={listType} />
          </Space>
        </div>
      </div>
      <div className={styles['screen-page-content-main-list']}>
        {list.length ? (
          <List
            ignoreAction={listType === 'screen' ? ['use'] : ['copy', 'share']}
            listType={listType}
            value={list}
            onChange={onChange}
          />
        ) : (
          <Empty />
        )}
      </div>
      <div className={styles['screen-page-content-main-pagination']}>
        <Pagination
          pageSize={10}
          current={currPage}
          onChange={onPageChange}
          total={total}
        />
      </div>
    </>
  );
}

export default ScreenList;
