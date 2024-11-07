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
    flag?: ComponentData.ScreenFlagType | '';
  };

  export type TGetScreenListRes = {
    total: number;
    list: TGetScreenListData[];
  };

  export type TGetScreenListData = {
    _id: string;
    description: string;
    name: string;
    flag: 'PC' | 'H5';
    group: string;
    poster: string;
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

  export type TAddScreenParams = {
    name: string;
    description?: string;
    poster: string;
    flag: 'PC' | 'H5';
    data: string;
  };

  export type TEditScreenParams = TAddScreenParams & {
    _id: string;
  };

  export type TEditScreenPoolParams = {
    _id: string;
    type: 'component' | 'undo' | 'redo' | 'guideLine' | 'callback' | 'screen';
    action?:
      | ComponentMethod.SetComponentMethodParamsData[]
      | ComponentMethod.SetComponentMethodParamsData
      | ComponentData.TGuideLineConfig
      | ComponentData.TFilterConfig[]
      | ComponentMethod.GlobalUpdateScreenDataParams;
  };

  export type TCreateScreenPoolParams = {
    _id: string;
    type: 'screen' | 'model';
  };

  export type TShareScreenGetParams = {
    _id: string;
  };

  export type TShareScreenGetData = {
    auth: 'PUBLIC' | 'PRIVATE';
    password: boolean;
    time: number;
  };

  export type TShareScreenHeartbeatParams = {
    _id: string;
  };

  export type TShareScreenPostParams = {
    _id: string;
    password: string;
  };

  export type TScreenDetail = {
    _id: string;
    name: string;
    description: string;
    poster: string;
    components: any;
    version: string;
  };

  export type TPreRequestDataParams = {
    url: string;
    body: string;
    header: string;
    method: 'get' | 'post';
  };

  export type TPreLeadInDataParams = {
    _id: string;
    type: 'screen' | 'model';
  };

  export type TPreExportDataParams = {
    _id: string;
    type: 'screen' | 'model';
  };

  export type MediaParams = {
    current: number;
    pageSize: number;
    _id?: string;
  };

  export type MediaData = {
    createdAt: string;
    updatedAt: string;
    src: string;
    image_id: string;
    _id: string;
    classify: string;
  };

  export type MediaDataRes = {
    total: number;
    list: MediaData[];
  };

  export type MediaClassicData = {
    name: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };

  export type AddMediaClassicParams = {
    name: string;
  };

  export type UpdateMediaClassParams = AddMediaClassicParams & {
    _id: string;
  };

  export type AddMediaDataParams = {
    _id: string;
    image: string;
  };

  export type DeleteMediaDataParams = {
    _id: string;
  };

  export type GetScreenShotListParams = {
    _id: string;
    content?: string;
  };

  export type GetScreenShotListData = {
    _id: string;
    created?: string;
    createdAt: string;
    updatedAt?: string;
    user: string;
    description: string;
    isUse: boolean;
    username?: string;
    avatar?: string;
  };

  export type UpdateScreenShotData = {
    description: string;
    _id: string;
    screen: string;
  };

  export type LocalScreenShotDataValue = GetScreenShotListData & {
    value: ComponentData.TScreenData;
    version: string;
  };

  export type LocalScreenShotData = {
    [screenId: string]: LocalScreenShotDataValue[];
  };

  export type PostFeedbackParams = {
    type: 'BUG' | 'RECOMMEND' | 'QUESTION';
    description: string;
    image?: File[];
  };
}

declare namespace API_MOCK {
  export type TGetMockKindListData = {
    id: string;
    value: string;
    description: string;
  };
}

declare namespace API_THIRD {
  export type TWeatherParams = {
    city: string;
  };

  export type TWeatherData = {
    realtime: {
      info: string;
      wid: string;
      temperature: string;
      humidity: string;
      direct: string;
      power: string;
      aqi: string;
    };
  };
}

declare namespace API_MEDIA_MANAGE {}
