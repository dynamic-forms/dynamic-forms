import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { NotificationsToggle } from '../../../state/notifications/notifications.actions';
import { NotificationsState } from '../../../state/notifications/notifications.state';

@Component({
  selector: 'app-notifications-toggle',
  imports: [AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './notifications-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsToggleComponent {
  private readonly store = inject(Store);
  readonly enabled$ = this.store.select(NotificationsState.enabled);

  toggle(): void {
    this.store.dispatch([new NotificationsToggle()]);
  }
}
