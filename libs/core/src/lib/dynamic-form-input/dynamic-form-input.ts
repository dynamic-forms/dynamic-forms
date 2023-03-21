import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormInputOptionItem } from './dynamic-form-input-option-item';

export interface DynamicFormInput<Value = any> {
  type: string;
  defaultValue?: Value;
  placeholder?: string;
  inputType?: string;
  options?: string[] | DynamicFormInputOptionItem[];
  multiple?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}

export type DynamicFormInputValue<FormInput> = FormInput extends DynamicFormInput<infer Value> ? Value : never;

export interface DynamicFormInputDefinition<
  FormInput extends DynamicFormInput
> extends DynamicFormControlDefinition<DynamicFormInputValue<FormInput>, FormInput> {
  prefixAddOns?: undefined;
  suffixAddOns?: undefined;
}

export type DynamicFormInputWithAddOnsDefinition<FormInput extends DynamicFormInput> =
  DynamicFormControlDefinition<DynamicFormInputValue<FormInput>, FormInput>;

export class DynamicFormInputControl<FormInput extends DynamicFormInput>
  extends DynamicFormControl<DynamicFormInputValue<FormInput>, FormInput> {}

