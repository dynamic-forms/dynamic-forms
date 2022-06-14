import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption } from '../dynamic-form-input-option-item';

export type DynamicFormToggleOption<TValue extends string | number = string | number> =
  DynamicFormInputOption<TValue>;

export interface DynamicFormToggle<TValue extends string | number = string | number> extends DynamicFormInput<TValue> {
  type: 'toggle';
  options: DynamicFormToggleOption<TValue>[];
}

export type DynamicFormToggleDefinition<TValue extends string | number = string | number> =
  DynamicFormInputDefinition<DynamicFormToggle<TValue>>;

export class DynamicFormToggleControl<TValue extends string | number = string | number>
  extends DynamicFormInputControl<DynamicFormToggle<TValue>> {}
