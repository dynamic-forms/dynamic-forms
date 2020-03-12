import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationItemPop } from './../../state/notification/notification.actions';
import { Notification, NotificationItem, NOTIFICATION } from './../../state/notification/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Select(NOTIFICATION)
  notification$: Observable<Notification>;

  constructor(private store: Store) {}

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
