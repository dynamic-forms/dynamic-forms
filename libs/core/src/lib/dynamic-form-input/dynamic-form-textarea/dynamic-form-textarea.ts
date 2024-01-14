import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormTextarea extends DynamicFormInput<string> {
  type: 'textarea';
}

export type DynamicFormTextareaDefinition = DynamicFormInputDefinition<DynamicFormTextarea>;

export type DynamicFormTextareaControl = DynamicFormInputControl<DynamicFormTextarea>;
