import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationsToggle } from '../../../state/notifications/notifications.actions';
import { NotificationsState } from '../../../state/notifications/notifications.state';

@Component({
  selector: 'app-notifications-toggle',
  templateUrl: './notifications-toggle.component.html',
  styleUrls: ['./notifications-toggle.component.scss']
})
export class NotificationsToggleComponent {
  @Select(NotificationsState.enabled)
  enabled$: Observable<boolean>;

  constructor(private store: Store) {}

  toggle(): void {
    this.store.dispatch([ new NotificationsToggle() ]);
  }
}
