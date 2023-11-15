import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormTextbox extends DynamicFormInput<string> {
  type: 'textbox';
  inputType?: 'text' | 'search' | 'email' | 'password';
  inputTypeForced?: undefined | 'text';
}

export type DynamicFormTextboxDefinition = DynamicFormInputDefinition<DynamicFormTextbox>;

export class DynamicFormTextboxControl extends DynamicFormInputControl<DynamicFormTextbox> {}
