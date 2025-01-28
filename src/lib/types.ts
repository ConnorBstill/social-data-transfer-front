export interface Folder {
  name: string;
  files: FileSystemEntry[] | FileList;
}

export interface OauthSession {
  did: string;
}
