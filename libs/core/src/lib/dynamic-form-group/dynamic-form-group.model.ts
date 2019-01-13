import { DynamicFormItem } from '../dynamic-form-item';

export interface DynamicFormGroup extends DynamicFormItem {
  items: DynamicFormItem[];
}
