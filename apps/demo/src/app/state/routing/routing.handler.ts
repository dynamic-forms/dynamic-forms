import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { NotificationItemPush } from '../notifications/notifications.actions';
import { NotificationItem, NotificationType } from '../notifications/notifications.model';
import { ProgressItemPop, ProgressItemPush } from '../progress/progress.actions';

@Injectable()
export class RoutingHandler implements OnDestroy {
  private readonly _routeSubscription: Subscription;

  constructor(private store: Store, private router: Router) {
    this._routeSubscription = this.router.events.subscribe({
      next: (event) => this.handle(event)
    });
  }

  ngOnDestroy(): void {
    this._routeSubscription.unsubscribe();
  }

  private handle(event: Event): void {
    if (event instanceof NavigationStart) {
      this.store.dispatch(new ProgressItemPush({ id: event.id }));
    } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
      const notificationItem = this.getNotificationItem(event);
      this.store.dispatch([
        new ProgressItemPop({ id: event.id }),
        new NotificationItemPush(notificationItem)
      ]);
    } else if (event instanceof NavigationEnd) {
      this.store.dispatch([
        new ProgressItemPop({ id: event.id })
      ]);
    }
  }

  private getNotificationItem(event: NavigationCancel | NavigationError): NotificationItem {
    return {
      id: 'RoutingError' + event.id,
      type: NotificationType.Error,
      title: 'Navigation error',
      message: `Navigation to ${ event.url } canceled.`,
      duration: 3000
    };
  }
}
