import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
  ],
  exports: [
    NotificationsComponent,
  ],
})
export class NotificationsModule {}
