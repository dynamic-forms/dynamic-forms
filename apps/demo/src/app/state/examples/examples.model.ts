import { StateToken } from '@ngxs/store';

export interface ExampleMenuItem {
  id?: string;
  groupId?: string;
  modelId?: string;
  docId?: string;
  items?: ExampleMenuItem[];
  label: string;
}

export interface ExampleMenu extends ExampleMenuItem {
  id: string;
  modelId?: string;
  docId?: string;
  label: string;
}

export interface ExampleMenuGroup extends ExampleMenuItem {
  groupId?: string;
  label: string;
  items: ExampleMenuItem[];
}

export interface ExamplesMenu {
  items: ExampleMenuItem[];
}

export interface Example extends ExampleMenu {
  path?: string;
}

export interface Examples {
  menu: ExamplesMenu;
  examples: Record<string, Example>;
}

export const EXAMPLES = new StateToken<Examples>('examples');
