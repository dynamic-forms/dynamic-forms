export type DynamicFormFieldUpdate = 'change' | 'debounce' | 'blur';

export interface DynamicFormFieldOptions {
  update?: DynamicFormFieldUpdate;
}
