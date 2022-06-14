import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormRadioOption<TValue extends string | number = string | number> =
  DynamicFormInputOption<TValue>;

export interface DynamicFormRadio<TValue extends string | number = string | number> extends DynamicFormInput<TValue> {
  type: 'radio';
  options: DynamicFormInputOption<TValue>[];
  inline?: boolean;
}

export type DynamicFormRadioDefinition<TValue extends string | number = string | number> =
  DynamicFormInputDefinition<DynamicFormRadio<TValue>>;

export class DynamicFormRadioControl<TValue extends string | number = string | number>
  extends DynamicFormInputControl<DynamicFormRadio<TValue>> {}
