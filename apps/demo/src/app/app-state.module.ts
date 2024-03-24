import { NgModule } from '@angular/core';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from './../environments/environment';
import { ConfigState } from './state/config/config.state';
import { ExamplesState } from './state/examples/examples.state';
import { LayoutState } from './state/layout/layout.state';
import { NotificationsState } from './state/notifications/notifications.state';
import { PreferencesState } from './state/preferences/preferences.state';
import { ProgressState } from './state/progress/progress.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([ConfigState, ExamplesState, LayoutState, NotificationsState, PreferencesState, ProgressState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [PreferencesState],
    }),
  ],
})
export class AppStateModule {}
