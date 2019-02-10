import { FormControlInput } from '@dynamic-forms/core/form-control/form-control-input';

export interface TextboxInput extends FormControlInput {
  type: 'text' | 'email' | 'password';
}
