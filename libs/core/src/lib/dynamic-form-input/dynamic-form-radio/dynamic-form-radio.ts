import { DynamicFormInput } from '../dynamic-form-input';
import { DynamicFormInputOptionItem } from '../dynamic-form-input-option-item';

export interface DynamicFormRadio extends DynamicFormInput {
  type: 'radio';
  options: DynamicFormInputOptionItem[];
}
