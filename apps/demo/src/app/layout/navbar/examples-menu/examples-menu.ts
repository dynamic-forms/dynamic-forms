export interface ExamplesMenuItem {
  id: string;
  label: string;
  items: ExamplesMenuItem[];
}

export interface ExamplesMenu {
   items: ExamplesMenuItem[];
}
