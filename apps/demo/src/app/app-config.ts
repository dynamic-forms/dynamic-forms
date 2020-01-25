import { InjectionToken } from '@angular/core';
import appConfigJson from './app.config.json';

export interface AppProject {
  url: string;
}

export interface AppRepository {
  url: string;
  branch: string;
  libraryQuery: string;
}

export interface AppVersion {
  name: string;
  url: string;
}

export interface AppConfig {
  build: string;
  version: string;
  project: AppProject;
  repository: AppRepository;
  versions: AppVersion[];
}

export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');

export const appConfig: AppConfig = appConfigJson;

