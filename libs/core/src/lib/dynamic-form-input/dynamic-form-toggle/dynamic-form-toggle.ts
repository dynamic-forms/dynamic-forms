import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormToggleOption<Value extends string | number = string | number> = DynamicFormInputOption<Value>;

export interface DynamicFormToggle<Value extends string | number = string | number> extends DynamicFormInput<Value> {
  type: 'toggle';
  options: DynamicFormToggleOption<Value>[];
}

export type DynamicFormToggleDefinition<Value extends string | number = string | number> = DynamicFormInputDefinition<
  DynamicFormToggle<Value>
>;

export class DynamicFormToggleControl<Value extends string | number = string | number> extends DynamicFormInputControl<
  DynamicFormToggle<Value>
> {}
