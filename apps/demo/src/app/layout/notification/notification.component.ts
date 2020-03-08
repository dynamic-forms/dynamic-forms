import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationItemPop } from './../../state/notification/notification.actions';
import { NotificationItem } from './../../state/notification/notification.model';
import { NotificationState } from './../../state/notification/notification.state';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  state$: Observable<NotificationState>;

  constructor(private store: Store) {
    this.state$ = this.store.select(NotificationState);
  }

  remove(item: NotificationItem): void {
    this.store.dispatch(new NotificationItemPop(item));
  }
}
