import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormInputOptionItem } from './dynamic-form-input-option-item';

export interface DynamicFormInput<TValue = any> {
  type: string;
  defaultValue?: TValue;
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

export type DynamicFormInputValue<FormInput> = FormInput extends DynamicFormInput<infer TValue> ? TValue : never;

export type DynamicFormInputDefinition<FormInput extends DynamicFormInput> =
  DynamicFormControlDefinition<DynamicFormInputValue<FormInput>, FormInput>;

export class DynamicFormInputControl<FormInput extends DynamicFormInput>
  extends DynamicFormControl<DynamicFormInputValue<FormInput>, FormInput> {}

