import { StateToken } from '@ngxs/store';

export interface Project {
  url: string;
}

export interface Repository {
  url: string;
  branch: string;
  branchPath: string;
  libraryPath: string;
  appPath: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface Config {
  version: string;
  build: string;
  buildUrl: string;
  release: string;
  releaseUrl: string;
  project: Project;
  repository: Repository;
  versions: Version[];
}

export const CONFIG = new StateToken<Config>('config');
