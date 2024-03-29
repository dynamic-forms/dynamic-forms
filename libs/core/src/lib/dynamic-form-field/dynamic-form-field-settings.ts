export type DynamicFormFieldUpdateType = 'change' | 'debounce' | 'blur' | 'submit';

export interface DynamicFormFieldSettings {
  autoGeneratedId?: boolean;
  updateType?: DynamicFormFieldUpdateType;
  updateDebounce?: number;
}

export const dynamicFormFieldDefaultDebounce = 300;
