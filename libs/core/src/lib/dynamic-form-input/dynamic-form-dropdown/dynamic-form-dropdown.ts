import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOptionItem } from '../dynamic-form-input-option-item';

export interface DynamicFormDropdown extends DynamicFormInput {
  type: 'dropdown';
  options: DynamicFormInputOptionItem[];
}
