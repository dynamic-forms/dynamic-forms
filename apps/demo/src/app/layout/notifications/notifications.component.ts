import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationItemPop } from '../../state/notifications/notifications.actions';
import { Notifications, NotificationItem, NOTIFICATIONS } from '../../state/notifications/notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  @Select(NOTIFICATIONS)
  notifications$: Observable<Notifications>;

  constructor(private store: Store) {}

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
