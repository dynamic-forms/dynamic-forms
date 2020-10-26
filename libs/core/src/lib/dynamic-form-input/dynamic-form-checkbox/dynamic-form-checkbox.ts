import { DynamicFormInput } from '../dynamic-form-input';

export interface DynamicFormCheckbox extends DynamicFormInput {
  type: 'checkbox';
  indeterminate?: boolean;
  inline?: boolean;
}
