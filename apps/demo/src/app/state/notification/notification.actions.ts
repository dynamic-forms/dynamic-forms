import { NotificationItem } from './notification.model';

export class NotificationToggle {
  static readonly type: string = '[Notification] Toggle';
}

export class NotificationItemPush {
  static readonly type: string = '[NotificationItem] PUSH';
  constructor(public item: NotificationItem) {}
}

export class NotificationItemPop {
  static readonly type: string = '[NotificationItem] POP';
  constructor(public item: NotificationItem) {}
}
