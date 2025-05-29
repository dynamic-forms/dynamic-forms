import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationsToggle } from '../../../state/notifications/notifications.actions';
import { NotificationsState } from '../../../state/notifications/notifications.state';

@Component({
  selector: 'app-notifications-toggle',
  imports: [AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './notifications-toggle.component.html',
})
export class NotificationsToggleComponent {
  @Select(NotificationsState.enabled)
  enabled$: Observable<boolean>;

  constructor(private store: Store) {}

  toggle(): void {
    this.store.dispatch([new NotificationsToggle()]);
  }
}
