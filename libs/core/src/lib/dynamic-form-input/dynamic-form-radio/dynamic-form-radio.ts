import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormRadioOption<Value extends string | number = string | number> = DynamicFormInputOption<Value>;

export interface DynamicFormRadio<Value extends string | number = string | number> extends DynamicFormInput<Value> {
  type: 'radio';
  options: DynamicFormInputOption<Value>[];
  inline?: boolean;
}

export type DynamicFormRadioDefinition<Value extends string | number = string | number> = DynamicFormInputDefinition<
  DynamicFormRadio<Value>
>;

export class DynamicFormRadioControl<Value extends string | number = string | number> extends DynamicFormInputControl<
  DynamicFormRadio<Value>
> {}
