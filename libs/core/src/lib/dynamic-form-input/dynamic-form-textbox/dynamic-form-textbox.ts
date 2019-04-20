import { DynamicFormInput } from '../dynamic-form-input';

export interface DynamicFormTextbox extends DynamicFormInput {
  type: 'textbox';
  inputType?: 'text' | 'search' | 'email' | 'password';
}
