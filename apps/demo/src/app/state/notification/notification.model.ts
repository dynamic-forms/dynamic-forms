export enum NotificationItemType {
  Error = 0,
  Warning = 1
}

export interface NotificationItem {
  id: any;
  type: NotificationItemType;
  title: string;
  message?: string;
  duration?: number;
}

export interface Notification {
  enabled: boolean;
  items: NotificationItem[];
}
