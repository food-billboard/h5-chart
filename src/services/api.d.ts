declare namespace API_UPLOAD {
  export interface UploadParams {
    file: File;
  }

  export type TAuthType = 'PRIVATE' | 'PUBLIC';

  export interface ICheckUploadFileParams {
    'Tus-Resumable': '1.0.0';
    md5: string;
    auth: TAuthType;
    size: number;
    mime: string;
    name?: string;
    chunk: number;
  }

  export interface ICheckUploadFileRes {
    'Tus-Resumable': '1.0.0';
    location: string;
    'Upload-Offset': number;
    'Upload-Length': number;
    'Upload-Id': string;
  }

  export interface UploadRes {
    _id: string;
    url: string;
  }

  export interface IUploadParams {
    md5: string;
    offset: number;
    file: Blob;
  }

  export interface IGetUploadParams {
    _id: string;
    type?: 0 | 1 | 2;
  }
}

declare namespace API_SCREEN {
  export type TGetScreenListParams = {
    currPage?: number;
    pageSize?: number;
    content?: string;
  };

  export type TGetScreenListRes = {
    total: number;
    list: TGetScreenListData[];
  };

  export type TGetScreenListData = {
    id: string;
    description: string;
    name: string;
    flag: 'WEB' | 'H5';
    group: string;
    poster: string;
    share: {
      open: boolean;
      time?: number;
      password?: string;
    };
    enable: boolean;
  };

  export type TDeleteScreenParams = {
    _id: string;
  };

  export type TPreviewScreenParams = {
    _id: string;
  };

  export type TShareScreenParams = {
    _id: string;
    auth: 'PUBLIC' | 'PRIVATE';
    time?: number;
    password?: string;
  };

  export type TCloseShareScreenParams = {
    _id: string;
  };

  export type TEnableScreenParams = {
    _id: string;
  };

  export type TDisabledScreenParams = {
    _id: string;
  };

  export type TGetScreenDetail = {
    _id: string;
  };
}
