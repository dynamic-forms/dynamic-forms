import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormNumberbox extends DynamicFormInput<number> {
  type: 'numberbox';
}

export type DynamicFormNumberboxDefinition = DynamicFormInputDefinition<DynamicFormNumberbox>;

export type DynamicFormNumberboxControl = DynamicFormInputControl<DynamicFormNumberbox>;
