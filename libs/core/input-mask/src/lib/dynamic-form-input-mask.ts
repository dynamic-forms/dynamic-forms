import { DynamicFormControlTemplate, DynamicFormInput, DynamicFormInputDefinition } from '@dynamic-forms/core';

export interface DynamicFormInputMaskOptions {
  alias?: string;
  mask?: string;
  rightAlign?: boolean;
  showMaskOnFocus?: boolean;
  showMaskOnHover?: boolean;
}

export interface DynamicFormInputMask extends DynamicFormInput<string> {
  type: 'input-mask';
  maskOptions?: DynamicFormInputMaskOptions;
}

export type DynamicFormInputMaskTemplate = DynamicFormControlTemplate<string, DynamicFormInputMask>;

export type DynamicFormInputMaskDefinition = DynamicFormInputDefinition<DynamicFormInputMask>;
