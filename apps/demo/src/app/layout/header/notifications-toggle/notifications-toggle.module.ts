import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsToggleComponent } from './notifications-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    NotificationsToggleComponent,
  ],
  exports: [
    NotificationsToggleComponent,
  ],
})
export class NotificationsToggleModule {}
