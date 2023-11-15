import { StateToken } from '@ngxs/store';

export enum NotificationType {
  Error = 0,
  Warning = 1,
  Info = 2,
  Debug = 3,
}

export interface NotificationMessage {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export interface NotificationMessages {
  info: NotificationMessage;
  success: NotificationMessage;
  error: NotificationMessage;
}

export interface NotificationItem extends NotificationMessage {
  id: any;
}

export interface Notifications {
  enabled: boolean;
  items: NotificationItem[];
}

export const NOTIFICATIONS = new StateToken<Notifications>('notifications');
