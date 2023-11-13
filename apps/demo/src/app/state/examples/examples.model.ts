import { StateToken } from '@ngxs/store';

export interface ExampleMenu {
  id: string;
  modelId?: string;
  docId?: string;
  label: string;
}

export interface ExampleMenuGroup {
  groupId?: string;
  label: string;
  items: ExampleMenuItem[];
}

export type ExampleMenuItem = ExampleMenu | ExampleMenuGroup;

export interface ExamplesMenu {
  items: ExampleMenuItem[];
}

export interface Example extends ExampleMenu {
  path?: string;
}

export interface Examples {
  menu: ExamplesMenu;
  examples: { [key: string]: Example };
}

export const EXAMPLES = new StateToken<Examples>('examples');
