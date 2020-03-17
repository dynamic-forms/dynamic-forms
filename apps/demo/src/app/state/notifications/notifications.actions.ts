import { NotificationItem } from './notifications.model';

export class NotificationsToggle {
  static readonly type: string = '[Notifications] Toggle';
}

export class NotificationItemPush {
  static readonly type: string = '[NotificationItem] PUSH';
  constructor(public item: NotificationItem) {}
}

export class NotificationItemPop {
  static readonly type: string = '[NotificationItem] POP';
  constructor(public item: NotificationItem) {}
}
