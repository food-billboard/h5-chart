import { FileImageOutlined, LinkOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Upload, UploadProps, App, Image as AntImage } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { useCallback, CSSProperties, useState, useRef, useEffect } from 'react';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import {
  UploadImage,
  createBaseUploadFile,
  createUploadedFile,
  beforeDelete,
} from '@/utils/Assist/Upload';
import Input, { InputRef } from './Input';
import styles from './index.less';

const MAX_FILE_SIZE = 1021 * 5;

export function getBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const UploadButton = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      style={props.style}
      className={classnames(
        styles['component-image-upload-placeholder'],
        props.className,
      )}
    >
      <FileImageOutlined />
      <div style={{ marginTop: 8 }}>点击这里进行更改</div>
    </div>
  );
};

const PicturesWall = (
  props: Partial<Omit<UploadProps, 'fileList' | 'onChange'>> & {
    value?: UploadFile[];
    onChange?: (value: UploadFile[]) => void;
    inputVisible?: boolean;
    height?: CSSProperties['height'];
  },
) => {
  const [value = [], setValue] = useControllableValue<UploadFile[]>(props, {
    defaultValuePropName: 'defaultFileList',
  });

  const { message } = App.useApp();

  const {
    value: propsValue,
    onChange,
    className,
    inputVisible = true,
    height = '200px',
    ...nextProps
  } = props;

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [validLoading, setValidLoading] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);

  const handleCancel = useCallback(() => setPreviewVisible(false), []);

  const setInputValue = useCallback((value: string = '') => {
    inputRef.current?.setValue(value);
  }, []);

  // 预览
  const handlePreview = useCallback(
    async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        setInputValue(file.preview);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    },
    [setInputValue],
  );

  const onRemove = useCallback(
    (file) => {
      setInputValue('');
      setValue([]);
      return beforeDelete(file);
    },
    [setInputValue],
  );

  // 静态自定义上传
  const beforeUploadStatic = useCallback(
    async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        message.info('文件过大');
      } else {
        const fileUrl = await getBase64(file);
        const baseUploadFile = createUploadedFile(fileUrl);
        onRemove(value[0]);
        setValue([baseUploadFile as any]);
        setInputValue(fileUrl);
      }

      return false;
    },
    [UploadImage, setInputValue, onRemove, value],
  );

  // 默认自定义上传
  const beforeUploadNormal = useCallback(
    async (file) => {
      const baseUploadFile = createBaseUploadFile(file);
      onRemove(value[0]);
      setValue([baseUploadFile]);
      UploadImage(baseUploadFile, {
        onChange: (value) => {
          setValue([value]);
          setInputValue(value.url);
        },
      });

      return false;
    },
    [UploadImage, setInputValue, onRemove, value],
  );

  // 自定义上传文件
  const beforeUpload = useCallback(
    async (file) => {
      if (GlobalConfig.IS_STATIC) {
        return beforeUploadStatic(file);
      } else {
        return beforeUploadNormal(file);
      }
    },
    [beforeUploadStatic, beforeUploadNormal],
  );

  const onUrlChange = useCallback(
    (e) => {
      const [target] = value;
      const newUrl = e.target.value;
      if (newUrl === target?.url) return;
      if (!newUrl) {
        setValue([]);
        return;
      }
      setValidLoading(true);
      const image = new Image();
      image.onload = () => {
        beforeDelete(target);
        let newTarget: any = target;
        if (target) {
          newTarget.url = newUrl;
          newTarget.uid = nanoid();
          newTarget.originFileObj = undefined;
          newTarget.status = 'done';
        } else {
          newTarget = createUploadedFile(newUrl);
        }
        setValidLoading(false);
        setValue([newTarget]);
      };
      image.onerror = () => {
        message.info('图片资源获取失败');
        setValidLoading(false);
      };
      image.src = newUrl;
    },
    [value, onRemove],
  );

  useEffect(() => {
    const inputValue = inputRef.current?.getValue();
    const [target] = value;
    if (inputValue !== target?.url && target?.url) {
      inputRef.current?.setValue(target.url);
    }
  }, [value]);

  return (
    <div
      style={{
        ...nextProps.style,
        // @ts-ignore
        '--upload-item-height': height,
      }}
      className={styles['component-image-upload']}
    >
      {!!inputVisible && (
        <Input
          defaultValue={value[0]?.preview || ''}
          onBlur={onUrlChange}
          className="w-100 m-b-4"
          ref={inputRef}
          prefix={<LinkOutlined />}
          placeholder="请输入图片地址"
        />
      )}
      <Upload
        listType="picture-card"
        fileList={value.map((item) => ({
          status: 'done',
          ...item,
        }))}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        accept="image/*"
        onRemove={onRemove}
        disabled={validLoading}
        {...nextProps}
        className={className}
      >
        {value.length >= 1 ? null : <UploadButton />}
      </Upload>
      <AntImage
        width={200}
        style={{ display: 'none' }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </div>
  );
};

export const CommonImageListUpload = (
  props: Partial<Omit<UploadProps, 'fileList' | 'onChange'>> & {
    value?: UploadFile[];
    onChange?: (value: UploadFile[]) => void;
    inputVisible?: boolean;
    height?: CSSProperties['height'];
    limit?: number;
    needUpload?: boolean;
  },
) => {
  const [value = [], setValue] = useControllableValue<UploadFile[]>(props, {
    defaultValuePropName: 'defaultFileList',
    defaultValue: [],
  });

  const {
    value: propsValue,
    onChange,
    className,
    inputVisible = true,
    height = '200px',
    limit = 1,
    needUpload = true,
    ...nextProps
  } = props;

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  // 预览
  const handlePreview = useCallback(async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }, []);

  const onRemove = useCallback((file) => {
    setValue((prev = []) => {
      return prev.filter((item) => item.uid !== file.uid);
    });
    return true;
  }, []);

  // 自定义上传
  const beforeUpload = useCallback(
    async (file) => {
      const baseUploadFile = createBaseUploadFile(file);
      setValue((prev = []) => {
        return [
          ...prev,
          {
            ...baseUploadFile,
            status: needUpload ? 'uploading' : 'done',
          },
        ];
      });
      if (needUpload) {
        UploadImage(baseUploadFile, {
          onChange: (value) => {
            setValue((prev = []) => {
              return prev.map((item) => {
                if (item.uid === value.uid) return value;
                return item;
              });
            });
          },
        });
      }

      return false;
    },
    [needUpload],
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={value.map((item) => ({
          status: 'done',
          ...item,
        }))}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        accept="image/*"
        onRemove={onRemove}
        {...nextProps}
        className={className}
      >
        {value.length >= limit ? null : <UploadButton />}
      </Upload>
      <AntImage
        width={200}
        style={{ display: 'none' }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </>
  );
};

export default PicturesWall;
