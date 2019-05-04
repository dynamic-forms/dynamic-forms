import { DynamicFormInput } from '../dynamic-form-input';

export interface DynamicFormCombobox extends DynamicFormInput {
  type: 'combobox';
  options: string[];
}
