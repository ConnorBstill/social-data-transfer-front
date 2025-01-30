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
