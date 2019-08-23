export interface DynamicFormFieldUpdateDebounce {
  time: number;
}

export type DynamicFormFieldUpdate = 'change' | 'debounce' | 'blur' | DynamicFormFieldUpdateDebounce;

export interface DynamicFormFieldOptions {
  update?: DynamicFormFieldUpdate;
}

export const dynamicFormFieldDefaultDebounceTime = 300;

