import { DynamicFormItem } from '../dynamic-form-item';

export interface DynamicFormControl extends DynamicFormItem {
  input: { type: string };
}
