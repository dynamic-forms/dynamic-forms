import { FormControlInput } from '@dynamic-forms/core';

export interface TextboxInput extends FormControlInput {
  type: 'text' | 'email' | 'password';
}
