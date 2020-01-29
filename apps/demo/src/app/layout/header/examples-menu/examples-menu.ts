export interface ExamplesMenuItem {
  id: string;
  modelId?: string;
  label: string;
  items: ExamplesMenuItem[];
}

export interface ExamplesMenu {
   items: ExamplesMenuItem[];
}
