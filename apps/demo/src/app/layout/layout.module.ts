import { NgModule } from '@angular/core';
import { ContentModule } from './content/content.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProgressModule } from './progress/progress.module';

@NgModule({
  imports: [
    HeaderModule,
    ContentModule,
    FooterModule,
    NotificationsModule,
    ProgressModule
  ],
  exports: [
    HeaderModule,
    ContentModule,
    FooterModule,
    NotificationsModule,
    ProgressModule
  ]
})
export class LayoutModule {}
