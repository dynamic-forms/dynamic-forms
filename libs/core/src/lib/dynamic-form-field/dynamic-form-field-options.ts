export type DynamicFormFieldUpdate = 'change' | 'debounce' | 'blur' | 'submit';

export interface DynamicFormFieldOptions {
  update?: DynamicFormFieldUpdate;
}
