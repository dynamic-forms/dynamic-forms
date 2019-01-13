import { DynamicFormItem } from '../dynamic-form-item';

export interface DynamicFormArray extends DynamicFormItem {
  items: DynamicFormItem[];
}
