import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationItemPop } from '../../state/notifications/notifications.actions';
import { NOTIFICATIONS, NotificationItem, Notifications } from '../../state/notifications/notifications.model';

@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [AsyncPipe, NgFor, NgIf, MatChipsModule, MatIconModule],
})
export class NotificationsComponent {
  @Select(NOTIFICATIONS)
  notifications$: Observable<Notifications>;

  constructor(private store: Store) {}

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
