import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { NotificationItemPop, NotificationItemPush } from './notifications.actions';
import { NotificationItem, NotificationMessage, NotificationMessages, NotificationType } from './notifications.model';

@Injectable()
export class NotificationsService {
  constructor(private store: Store) {}

  pipe<T>(action: Observable<T>, messages: NotificationMessages): Observable<T> {
    const infoItem = this.pushNotification(messages.info);
    return action.pipe(
      tap(_ => {
        this.pushNotification(messages.success, infoItem);
      }),
      catchError(error => {
        this.pushNotification(messages.error, infoItem);
        return throwError(error);
      })
    );
  }

  private pushNotification(message: NotificationMessage, popItem?: NotificationItem): NotificationItem {
    const item = this.getNotificationItem(message);
    const actions = popItem
      ? [ new NotificationItemPop(popItem), new NotificationItemPush(item) ]
      : [ new NotificationItemPush(item) ];
    this.store.dispatch(actions);
    return item;
  }

  private getNotificationItem(message: NotificationMessage): NotificationItem {
    return { id: `Notification${ Date.now() }`, ...message };
  }
}
