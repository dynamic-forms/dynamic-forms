import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormRadioOption = DynamicFormInputOption;

export interface DynamicFormRadio extends DynamicFormInput {
  type: 'radio';
  options: DynamicFormInputOption[];
}
