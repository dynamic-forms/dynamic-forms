import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption, DynamicFormInputOptionGroup } from '../dynamic-form-input-option-item';

export type DynamicFormSelectOption<Value extends string | number = string | number> =
  | DynamicFormInputOption<Value>
  | DynamicFormInputOptionGroup<Value>;

export interface DynamicFormSelect<Value extends string | number = string | number> extends DynamicFormInput<Value | Value[]> {
  type: 'select';
  options: DynamicFormSelectOption<Value>[];
  multiple: boolean;
}

export type DynamicFormSelectDefinition<Value extends string | number = string | number> = DynamicFormInputDefinition<
  DynamicFormSelect<Value>
>;

export class DynamicFormSelectControl<Value extends string | number = string | number> extends DynamicFormInputControl<
  DynamicFormSelect<Value>
> {}
