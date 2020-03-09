import { AppConfig } from './../app/app-config';

export const appConfig: AppConfig = {
  version: '9.0.0-preview',
  build: '',
  project: {
    url: 'https://dev.azure.com/alexandergebuhr/dynamic-forms'
  },
  repository: {
    url: 'https://dev.azure.com/alexandergebuhr/_git/dynamic-forms',
    branch: 'next',
    libraryQuery: 'path=%2Flibs%2F{{library}}&version=GB{{branch}}'
  },
  versions: [
    {
      name: '8.0.0-preview',
      url: 'https://dynamic-forms.azurewebsites.net'
    },
    {
      name: '9.0.0-preview',
      url: 'https://dynamic-forms.azurewebsites.net/next'
    }
  ]
};
