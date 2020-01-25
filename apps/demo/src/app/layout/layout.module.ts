import { NgModule } from '@angular/core';
import { ContentModule } from './content/content.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { NotificationModule } from './notification/notification.module';
import { ProgressModule } from './progress/progress.module';

@NgModule({
  imports: [
    HeaderModule,
    ContentModule,
    FooterModule,
    NotificationModule,
    ProgressModule
  ],
  exports: [
    HeaderModule,
    ContentModule,
    FooterModule,
    NotificationModule,
    ProgressModule
  ]
})
export class LayoutModule {}
