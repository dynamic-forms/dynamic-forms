import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormDatepicker extends DynamicFormInput<string | Date> {
  type: 'datepicker';
}

export type DynamicFormDatepickerDefinition = DynamicFormInputDefinition<DynamicFormDatepicker>;

export class DynamicFormDatepickerControl extends DynamicFormInputControl<DynamicFormDatepicker> {}
