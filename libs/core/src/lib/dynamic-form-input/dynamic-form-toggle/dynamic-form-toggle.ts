import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormToggleOption = DynamicFormInputOption;

export interface DynamicFormToggle extends DynamicFormInput {
  type: 'toggle';
  options: DynamicFormToggleOption[];
}
