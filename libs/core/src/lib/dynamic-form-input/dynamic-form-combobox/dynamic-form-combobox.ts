import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormCombobox extends DynamicFormInput<string> {
  type: 'combobox';
  options: string[];
}

export type DynamicFormComboboxDefinition = DynamicFormInputDefinition<DynamicFormCombobox>;

export type DynamicFormComboboxControl = DynamicFormInputControl<DynamicFormCombobox>;
