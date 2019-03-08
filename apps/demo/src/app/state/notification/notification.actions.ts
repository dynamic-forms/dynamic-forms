import { NotificationItem } from './notification.model';

export class NotificationToggle {
  static readonly type = '[Notification] Toggle';
}

export class NotificationItemPush {
  static readonly type = '[NotificationItem] PUSH';
  constructor(public item: NotificationItem) {}
}

export class NotificationItemPop {
  static readonly type = '[NotificationItem] POP';
  constructor(public item: NotificationItem) {}
}
