import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOption, DynamicFormInputOptionGroup } from '../dynamic-form-input-option-item';

export type DynamicFormDropdownOption = DynamicFormInputOption | DynamicFormInputOptionGroup;

export interface DynamicFormDropdown extends DynamicFormInput {
  type: 'dropdown';
  options: DynamicFormDropdownOption[];
}
