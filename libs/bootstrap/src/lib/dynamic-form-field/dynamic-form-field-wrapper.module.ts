import { DynamicFormsFeature, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import { bsDynamicFormControlErrorsType } from './dynamic-form-control-errors/dynamic-form-control-errors.module';
import { bsDynamicFormControlHintsType } from './dynamic-form-control-hints/dynamic-form-control-hints.module';
import { bsDynamicFormControlLabelType } from './dynamic-form-control-label/dynamic-form-control-label.module';

export const bsDynamicFormFieldWrapperTypes = [
  bsDynamicFormControlErrorsType,
  bsDynamicFormControlHintsType,
  bsDynamicFormControlLabelType,
];

export function withBsDynamicFormFieldWrapperDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormFieldWrappers(...bsDynamicFormFieldWrapperTypes)];
}
