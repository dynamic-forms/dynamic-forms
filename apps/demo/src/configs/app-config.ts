import { AppConfig } from './../app/app-config';

export const appConfig: AppConfig = {
  version: '1.0.0-preview',
  build: '',
  project: {
    url: 'https://dev.azure.com/alexandergebuhr/dynamic-forms'
  },
  repository: {
    url: 'https://dev.azure.com/alexandergebuhr/_git/dynamic-forms',
    branch: 'master',
    libraryQuery: 'path=%2Flibs%2F{{library}}&version=GB{{branch}}'
  },
  versions: [
    {
      name: 'Latest',
      url: 'https://dynamic-forms.azurewebsites.net/dev'
    },
    {
      name: 'Next',
      url: 'https://dynamic-forms.azurewebsites.net/next/dev'
    }
  ]
};

