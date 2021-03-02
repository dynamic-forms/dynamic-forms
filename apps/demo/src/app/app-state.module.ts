import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from './../environments/environment';
import { ConfigService } from './state/config/config.service';
import { ConfigState } from './state/config/config.state';
import { ExamplesService } from './state/examples/examples.service';
import { ExamplesState } from './state/examples/examples.state';
import { LayoutState } from './state/layout/layout.state';
import { NotificationsService } from './state/notifications/notifications.service';
import { NotificationsState } from './state/notifications/notifications.state';
import { ProgressService } from './state/progress/progress.service';
import { ProgressState } from './state/progress/progress.state';
import { RoutingHandler } from './state/routing/routing.handler';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ConfigState,
      ExamplesState,
      LayoutState,
      NotificationsState,
      ProgressState
    ], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    ConfigService,
    ExamplesService,
    ProgressService,
    NotificationsService,
    RoutingHandler
  ]
})
export class AppStateModule {}
