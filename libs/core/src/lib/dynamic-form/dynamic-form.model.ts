import { DynamicFormItem } from '../dynamic-form-item';

export interface DynamicForm extends DynamicFormItem {
  items: DynamicFormItem[];
}
