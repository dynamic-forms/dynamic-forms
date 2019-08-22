export type DynamicFormFieldUpdate = 'change' | 'blur' | 'submit';

export interface DynamicFormFieldOptions {
  update?: DynamicFormFieldUpdate;
}
