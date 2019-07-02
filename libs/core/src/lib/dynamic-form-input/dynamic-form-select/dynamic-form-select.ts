import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOption, DynamicFormInputOptionGroup } from '../dynamic-form-input-option-item';

export type DynamicFormSelectOption = DynamicFormInputOption | DynamicFormInputOptionGroup;

export interface DynamicFormSelect extends DynamicFormInput {
  type: 'select';
  options: DynamicFormSelectOption[];
  multiple: boolean;
}
