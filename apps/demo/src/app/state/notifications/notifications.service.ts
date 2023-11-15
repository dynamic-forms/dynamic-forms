import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { NotificationItemPop, NotificationItemPush } from './notifications.actions';
import { NotificationItem, NotificationMessage, NotificationMessages, NotificationType } from './notifications.model';

@Injectable()
export class NotificationsService {
  constructor(private store: Store) {}

  getInfoMessage(title: string, message?: string): NotificationMessage {
    return { type: NotificationType.Info, title, message, duration: 2000 };
  }

  getErrorMessage(title: string, message?: string): NotificationMessage {
    return { type: NotificationType.Error, title, message, duration: 3000 };
  }

  getMessages(infoTitle: string, successTitle: string, errorTitle: string): NotificationMessages {
    const info = this.getInfoMessage(infoTitle);
    const success = this.getInfoMessage(successTitle);
    const error = this.getErrorMessage(errorTitle);
    return { info, success, error };
  }

  pipe<T>(action: Observable<T>, messages: NotificationMessages): Observable<T> {
    const infoItem = this.pushNotification(messages.info);
    return action.pipe(
      tap(_ => {
        this.pushNotification(messages.success, infoItem);
      }),
      catchError(error => {
        this.pushNotification(messages.error, infoItem);
        return throwError(error);
      }),
    );
  }

  private pushNotification(message: NotificationMessage, popItem?: NotificationItem): NotificationItem {
    const item = this.getNotificationItem(message);
    const actions = popItem ? [new NotificationItemPop(popItem), new NotificationItemPush(item)] : [new NotificationItemPush(item)];
    this.store.dispatch(actions);
    return item;
  }

  private getNotificationItem(message: NotificationMessage): NotificationItem {
    return { id: `Notification-${uuid()}`, ...message };
  }
}
