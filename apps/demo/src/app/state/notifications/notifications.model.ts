import { StateToken } from '@ngxs/store';

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

export interface Notifications {
  enabled: boolean;
  items: NotificationItem[];
}

export const NOTIFICATIONS = new StateToken<Notifications>('notifications');
