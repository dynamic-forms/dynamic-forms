import { DynamicFormControlTemplate, DynamicFormInput, DynamicFormInputDefinition } from '@dynamic-forms/core';

export interface DynamicFormInputMaskAliasOptions {
  alias?: string;
}

export interface DynamicFormInputMaskTypeOptions extends DynamicFormInputMaskAliasOptions {
  mask?: string;
}

export interface DynamicFormInputMaskBaseOptions {
  alias?: string;
  mask?: string;
  rightAlign?: boolean;
  showMaskOnFocus?: boolean;
  showMaskOnHover?: boolean;
}

export interface DynamicFormInputMaskConverterOptions extends DynamicFormInputMaskAliasOptions {
  useConverter?: boolean;
}

export interface DynamicFormInputMaskNumberOptions extends DynamicFormInputMaskConverterOptions {
  digits?: number;
  radixPoint?: string;
  groupSeparator?: string;
  prefix?: string;
  suffix?: string;
}

export interface DynamicFormInputMaskDatetimeOptions extends DynamicFormInputMaskConverterOptions {
  inputFormat?: string;
}

export interface DynamicFormInputStyleOptions {
  rightAlign?: boolean;
  showMaskOnFocus?: boolean;
  showMaskOnHover?: boolean;
}

export type DynamicFormInputMaskOptions = DynamicFormInputMaskTypeOptions &
  DynamicFormInputMaskNumberOptions &
  DynamicFormInputMaskDatetimeOptions &
  DynamicFormInputStyleOptions;

export type DynamicFormInputMaskFormatOptions = DynamicFormInputMaskAliasOptions &
  DynamicFormInputMaskNumberOptions &
  DynamicFormInputMaskDatetimeOptions;

export interface DynamicFormInputMaskOptionChanges {
  options: Partial<DynamicFormInputMaskOptions>;
  converterChanges?: Partial<DynamicFormInputMaskConverterOptions>;
}

export interface DynamicFormInputMask extends DynamicFormInput<string> {
  type: 'input-mask';
  maskOptions?: DynamicFormInputMaskOptions;
}

export type DynamicFormInputMaskTemplate = DynamicFormControlTemplate<string, DynamicFormInputMask>;

export type DynamicFormInputMaskDefinition = DynamicFormInputDefinition<DynamicFormInputMask>;
