import { DynamicFormInput } from '@dynamic-forms/core';

export interface TextboxInput extends DynamicFormInput {
  type: 'textbox';
  inputType: 'text' | 'search' | 'email' | 'password';
}
