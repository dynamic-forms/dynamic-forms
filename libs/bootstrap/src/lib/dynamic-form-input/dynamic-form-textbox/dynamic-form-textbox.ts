import { DynamicFormInput } from '@dynamic-forms/core';

export interface DynamicFormTextbox extends DynamicFormInput {
  type: 'textbox';
  inputType?: 'text' | 'search' | 'email' | 'password';
}
