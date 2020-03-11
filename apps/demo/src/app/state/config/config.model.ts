import { StateToken } from '@ngxs/store';

export interface Project {
  url: string;
}

export interface Repository {
  url: string;
  branch: string;
  libraryQuery: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface Config {
  version: string;
  build: string;
  project: Project;
  repository: Repository;
  versions: Version[];
}

export const CONFIG = new StateToken<Config>('config');
