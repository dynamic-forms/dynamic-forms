import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationItemPop } from '../../state/notifications/notifications.actions';
import { NOTIFICATIONS, NotificationItem, Notifications } from '../../state/notifications/notifications.model';

@Component({
  selector: 'app-notifications',
  imports: [AsyncPipe, MatChipsModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  @Select(NOTIFICATIONS)
  notifications$: Observable<Notifications>;

  constructor(private store: Store) {}

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
