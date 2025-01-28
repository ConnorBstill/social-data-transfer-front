export interface Response<T> {
  data: T;
  msg: string;
  err: boolean;
}

export interface Folder {
  name: string;
  files: FileSystemEntry[] | FileList;
}

export interface OauthSession {
  did: string;
}
