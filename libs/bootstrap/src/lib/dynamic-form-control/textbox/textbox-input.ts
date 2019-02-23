import { DynamicFormControlInput } from '@dynamic-forms/core';

export interface TextboxInput extends DynamicFormControlInput {
  type: 'text' | 'email' | 'password';
}
