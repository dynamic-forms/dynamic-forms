import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';
import { DynamicFormInputOption, DynamicFormInputOptionGroup } from '../dynamic-form-input-option-item';

export type DynamicFormSelectOption<TValue extends string | number = string | number> =
  DynamicFormInputOption<TValue> | DynamicFormInputOptionGroup<TValue>;

export interface DynamicFormSelect<TValue extends string | number = string | number> extends DynamicFormInput<TValue | TValue[]> {
  type: 'select';
  options: DynamicFormSelectOption<TValue>[];
  multiple: boolean;
}

export type DynamicFormSelectDefinition<TValue extends string | number = string | number> =
  DynamicFormInputDefinition<DynamicFormSelect<TValue>>;

export class DynamicFormSelectControl<TValue extends string | number = string | number>
  extends DynamicFormInputControl<DynamicFormSelect<TValue>> {}
