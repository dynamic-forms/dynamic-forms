import { StateToken } from '@ngxs/store';

export interface ProgressItem {
  id: any;
  message?: string;
}

export interface Progress {
  items: ProgressItem[];
}

export const PROGRESS = new StateToken<Progress>('progress');
