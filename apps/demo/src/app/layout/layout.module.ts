import { NgModule } from '@angular/core';
import { ContentModule } from './content/content.module';
import { NavbarModule } from './navbar/navbar.module';
import { NotificationModule } from './notification/notification.module';
import { ProgressModule } from './progress/progress.module';

@NgModule({
  imports: [
    NavbarModule,
    ContentModule,
    NotificationModule,
    ProgressModule
  ],
  exports: [
    NavbarModule,
    ContentModule,
    NotificationModule,
    ProgressModule
  ]
})
export class LayoutModule {}
