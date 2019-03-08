import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {}
