export interface Response<T> {
  data: T;
  msg: string;
  err: boolean;
}

export interface Folder {
  name: string;
  files: File[];
}

export interface OauthSession {
  did: string;
}

export interface InstagramMedia {
  uri: string;
  creation_timestamp: number;
  media_metadata: {
    camera_metadata: {
      has_camera_metadata: boolean;
    };
  };
  title: string;
  cross_post_source: {
    source_app: string;
  };
  backup_uri: string;
}

export interface InstagramPost {
  media: InstagramMedia[];
  title: string;
  creation_timestamp: number;
}
