import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormCheckbox extends DynamicFormInput<boolean> {
  type: 'checkbox';
  indeterminate?: boolean;
  inline?: boolean;
}

export type DynamicFormCheckboxDefinition = DynamicFormInputDefinition<DynamicFormCheckbox>;

export type DynamicFormCheckboxControl = DynamicFormInputControl<DynamicFormCheckbox>;
