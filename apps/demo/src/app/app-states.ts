import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { NgxsModuleOptions } from '@ngxs/store';
import { environment } from '../environments/environment';
import { ConfigState } from './state/config/config.state';
import { ExamplesState } from './state/examples/examples.state';
import { LayoutState } from './state/layout/layout.state';
import { NotificationsState } from './state/notifications/notifications.state';
import { PreferencesState } from './state/preferences/preferences.state';
import { ProgressState } from './state/progress/progress.state';

export const appStates = [ConfigState, ExamplesState, LayoutState, NotificationsState, PreferencesState, ProgressState];

export const appStateOptions: NgxsModuleOptions = {
  developmentMode: !environment.production,
};

export const appStateFeatures = [
  withNgxsStoragePlugin({
    keys: [PreferencesState],
  }),
];
