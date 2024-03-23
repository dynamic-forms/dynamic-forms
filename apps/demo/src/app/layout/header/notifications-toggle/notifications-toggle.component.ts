import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationsToggle } from '../../../state/notifications/notifications.actions';
import { NotificationsState } from '../../../state/notifications/notifications.state';

@Component({
  standalone: true,
  selector: 'app-notifications-toggle',
  templateUrl: './notifications-toggle.component.html',
  styleUrl: './notifications-toggle.component.scss',
  imports: [AsyncPipe, NgIf, MatButtonModule, MatIconModule],
})
export class NotificationsToggleComponent {
  @Select(NotificationsState.enabled)
  enabled$: Observable<boolean>;

  constructor(private store: Store) {}

  toggle(): void {
    this.store.dispatch([new NotificationsToggle()]);
  }
}
