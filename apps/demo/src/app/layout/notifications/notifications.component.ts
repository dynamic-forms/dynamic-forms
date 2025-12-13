import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { NotificationItemPop } from '../../state/notifications/notifications.actions';
import { NOTIFICATIONS, NotificationItem } from '../../state/notifications/notifications.model';

@Component({
  selector: 'app-notifications',
  imports: [AsyncPipe, MatChipsModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  private readonly store = inject(Store);
  readonly notifications$ = this.store.select(NOTIFICATIONS);

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
