import { StateToken } from '@ngxs/store';

export interface Sidebar {
  opened: boolean;
}

export interface Layout {
  sidebar: Sidebar;
}

export const LAYOUT = new StateToken<Layout>('layout');
